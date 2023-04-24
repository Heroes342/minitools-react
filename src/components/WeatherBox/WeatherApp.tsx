import React from "react";
import { WeatherLogic } from "./WeatherLogic";
import { Link } from "react-router-dom";

function WeatherApp() {
  return (
    <div className="weather-box app-box">
      <Link className="no-underline" to="/weather">
        <h1>Weather</h1>
      </Link>
      <WeatherLogic />
    </div>
  );
}

export default WeatherApp;
