import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo.jsx";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import Button from "./Button.jsx";

export default function PageNav() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

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
            {isAuthenticated ? (
              <Button type={"primary"} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <NavLink to={"/login"} className={styles.ctaLink}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
