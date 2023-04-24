import React, { useEffect, useState } from "react";
import { WeatherHook } from "./customHooks/WeatherHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const WeatherLogic = () => {
  const [currCity, setCurrCity] = useState("Catania");
  const [inputValue, setInputValue] = useState(currCity);
  const [weatherData, _, isLoading, error] = WeatherHook(currCity);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrCity(inputValue);
  };

  return (
    <div className="weather-details">
      {isLoading && <span className="loading">Loading....</span>}
      {error != "" && <span className="loading">{error}</span>}
      {weatherData && (
        <ul className="details">
          <li key="icon">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].main}
              className="weather-icon"
            />
          </li>
          <li className="details-text" key="city">
            <b>City:</b> {weatherData.name}
          </li>
          <li className="details-text" key={weatherData.weather[0].id}>
            <b>Weather:</b> {weatherData.weather[0].main} -{" "}
            {weatherData.weather[0].description}
          </li>
          <li className="details-text" key="temp">
            <b>Temp:</b> {weatherData.main.temp} C° (feels like:{" "}
            {weatherData.main.feels_like} C°)
          </li>
          <li className="details-text" key="humidity">
            <b>Humidity:</b> {weatherData.main.humidity} %
          </li>
        </ul>
      )}
      <div className="input-city">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Insert a city name"
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button title="Search" type="submit">
            <FontAwesomeIcon icon={faSearch} size="sm" />
          </button>
        </form>
      </div>
    </div>
  );
};
