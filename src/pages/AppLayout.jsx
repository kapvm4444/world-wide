import Sidebar from "../components/Sidebar.jsx";
import styles from "./AppLayout.module.css";
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
