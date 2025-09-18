import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CityContext = createContext(null);

const BASE_URL = {
  live: "https://openapi.khush.pro/ww",
  local: "http://localhost:4000/cities",
};

const DataMode = "live";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };

    case "rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error("Unknown Action in city reducer");
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    //=> get all the cities
    async function getCitiesData() {
      dispatch({ type: "loading", payload: true });

      try {
        let data = await fetch(`${BASE_URL[DataMode]}`);
        data = await data.json();
        dispatch({
          type: "cities/loaded",
          payload: DataMode === "local" ? data : data.data,
        });
      } catch (err) {
        alert("Some error occurred while fetching the data! :(");
        dispatch({
          type: "rejected",
          payload: "Some error occurred while fetching the data! :(",
        });
      }
    }

    getCitiesData();
  }, []);

  //=> get just ONE CITY: means load the currentCity
  const getCity = useCallback(async function getCity(id) {
    if (currentCity.id === id) return;

    dispatch({ type: "loading", payload: true });

    try {
      let data = await fetch(`${BASE_URL[DataMode]}/${id}`);
      data = await data.json();
      dispatch({
        type: "city/loaded",
        payload: DataMode === "local" ? data : data.data,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Some error occurred while fetching the data! :(",
      });
    }
  });

  //=> CREATE CITY - via form
  async function createCity(newCity) {
    dispatch({
      type: "loading",
      payload: true,
    });

    try {
      const res = await fetch(`${BASE_URL[DataMode]}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({
        type: "city/created",
        payload: DataMode === "local" ? data : data.data,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Some error occurred while fetching the data! :(",
      });
    }
  }

  //=> DELETE A CITY
  async function deleteCity(id) {
    dispatch({
      type: "loading",
      payload: true,
    });

    try {
      const res = await fetch(`${BASE_URL[DataMode]}/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Some error occurred while fetching the data! :(",
      });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const cities = useContext(CityContext);
  if (cities === undefined)
    throw new Error(
      "You are Trying to access the city context outside the provider",
    );
  return cities;
}

export { useCities, CityProvider };
