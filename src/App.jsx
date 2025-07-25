import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

import { CityProvider } from "./contexts/CityContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";

import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import Product from "./pages/Product";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Product = lazy(() => import("./pages/Product"));
const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

export default function App() {
  return (
    <>
      <AuthProvider>
        <CityProvider>
          {/*=> Browser routing - one of the method for single page websites and routing*/}
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
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
            </Suspense>
          </BrowserRouter>
        </CityProvider>
      </AuthProvider>
    </>
  );
}
