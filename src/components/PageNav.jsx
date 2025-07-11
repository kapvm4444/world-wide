import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo.jsx";

export default function PageNav() {
  return (
    <>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          <li>
            <NavLink to={"/app"}>App</NavLink>
          </li>
          <li>
            <NavLink to={"/product"}>About Us</NavLink>
          </li>
          <li>
            <NavLink to={"/pricing"}>Pricing</NavLink>
          </li>
          <li>
            <NavLink to={"/login"} className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
