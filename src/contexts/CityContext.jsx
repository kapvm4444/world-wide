import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext(null);

const BASE_URL = {
  live: "https://openapi.khush.pro/ww",
  local: "http://localhost:4000/cities",
};

const DataMode = "live";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCitiesData() {
      try {
        setIsLoading(true);
        let data = await fetch(`${BASE_URL[DataMode]}`);
        data = await data.json();
        setCities(DataMode === "local" ? data : data.data);
      } catch (err) {
        alert("Some error occurred while fetching the data! :(");
      } finally {
        setIsLoading(false);
      }
    }

    getCitiesData();
  }, []);

  return (
    <CityContext.Provider value={{ cities, isLoading }}>
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
