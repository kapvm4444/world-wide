import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../contexts/CityContext.jsx";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeoLocation.js";
import Button from "./Button.jsx";

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([]);
  const [queryParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geoLocationPosition,
  } = useGeolocation();

  const mapLat = queryParams.get("lat");
  const mapLng = queryParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLng, mapLat]);

  useEffect(() => {
    console.log(geoLocationPosition);
    // if (geoLocationPosition)
    //   setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "USE MY LOCATION"}
      </Button>

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.emoji} &nbsp;{city.cityName}, {city.country}
            </Popup>
          </Marker>
        ))}
        <CenterLocation position={mapPosition} />
        <MapClick />
      </MapContainer>
    </div>
  );
}

function CenterLocation({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function MapClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
