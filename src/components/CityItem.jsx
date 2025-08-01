import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CityContext.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { emoji, name, date, position, id } = city;
  const { currentCity, deleteCity } = useCities();

  function handleDelete(evt) {
    evt.preventDefault();

    deleteCity(id);
  }

  return (
    <>
      <li>
        <Link
          to={`${id}/?lat=${position.lat}&lng=${position.lng}`}
          className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
        >
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{name}</h3>
          <time className={styles.date}>{formatDate(date)}</time>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            &times;
          </button>
        </Link>
      </li>
    </>
  );
}
