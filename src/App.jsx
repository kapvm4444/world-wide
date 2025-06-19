import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>

          <Route path={"app"} element={<AppLayout />}>
            <Route index element={<p>List</p>}></Route>
            <Route
              path={"countries"}
              element={<p>List of Countries</p>}
            ></Route>
            <Route path={"cities"} element={<p>List of Cities</p>}></Route>
            <Route path={"form"} element={<p>List of Form</p>}></Route>
          </Route>

          <Route path={"product"} element={<Product />}></Route>
          <Route path={"pricing"} element={<Pricing />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"*"} element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
