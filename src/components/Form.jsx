// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import { useCities } from "./../contexts/CityContext.jsx";
import DatePicker from "react-datepicker";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  const { createCity } = useCities();

  useEffect(
    function () {
      async function getCityFromLocation() {
        try {
          setIsLoading(true);
          setGeocodingError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "Whoa buddy! That is not in any country, try to click on a land. 😅",
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getCityFromLocation();
    },
    [lat, lng],
  );

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoading) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Try to click on the map to get started 🌎" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showMonthYearDropdown={true}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton navigateTo={"/app/cities"} />
      </div>
    </form>
  );
}

export default Form;
