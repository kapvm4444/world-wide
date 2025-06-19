import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Map() {
  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useSearchParams();
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>
        LAT: {lat} <br /> LNG: {lng}
      </h2>
    </div>
  );
}
