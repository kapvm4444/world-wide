import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import { useEffect, useState } from "react";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

const BASE_URL = {
  live: "https://openapi.khush.pro/ww",
  local: "http://localhost:4000/cities",
};

const DataMode = "live";

export default function App() {
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
    <>
      {/*=> Browser routing - one of the method for single page websites and routing*/}
      <BrowserRouter>
        <Routes>
          {/*=> Home Page Router*/}
          <Route index element={<Homepage />} />

          {/*=> Routes for app (Main Feature)*/}
          <Route path={"app"} element={<AppLayout />}>
            {/*=> Nested Routes*/}
            {/*=> Default - list of cities*/}
            <Route index element={<Navigate to={"cities"} replace />} />

            {/*=> for the list of countries*/}
            <Route
              path={"countries"}
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />

            {/*=> for the list of cities*/}
            <Route
              path={"cities"}
              element={<CityList cities={cities} isLoading={isLoading} />}
            />

            {/*=> URL Parameter route*/}
            <Route path={"cities/:id"} element={<City />} />

            {/*=> User Form*/}
            <Route path={"form"} element={<Form />} />
          </Route>

          {/*=> Product Router*/}
          <Route path={"product"} element={<Product />} />

          {/*=> Pricing Router*/}
          <Route path={"pricing"} element={<Pricing />} />

          {/*=> Login Router*/}
          <Route path={"/login"} element={<Login />} />

          {/*=> Default Router 404*/}
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
