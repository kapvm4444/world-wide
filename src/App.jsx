import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import { CityProvider } from "./contexts/CityContext.jsx";

export default function App() {
  return (
    <>
      <CityProvider>
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
              <Route path={"countries"} element={<CountryList />} />

              {/*=> for the list of cities*/}
              <Route path={"cities"} element={<CityList />} />

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
      </CityProvider>
    </>
  );
}
