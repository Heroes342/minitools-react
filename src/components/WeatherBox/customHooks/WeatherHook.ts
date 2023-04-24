import axios from "axios";
import React, { useEffect, useState } from "react";
import { WeatherDataInterface } from "../Interfaces/WeatherInterface";
const apiKey = "ea21ddbc0a6141020e378e0e96ff505c";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";

export const WeatherHook = (city = "Catania") => {
  const [cityWeather, setCityWeather] = useState<WeatherDataInterface>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        setisLoading(true);
        const response = await axios.get(
          url + city + "&appid=" + apiKey + "&units=metric"
        );
        const data = response.data;
        setCityWeather(data);
        setError("");
      } catch (error) {
        setError("No city found with that name...");
        setCityWeather(undefined);
        console.error(error);
      }
    };
    load();
    setisLoading(false);
  }, [city]);

  return [cityWeather, setCityWeather, isLoading, error] as [
    WeatherDataInterface,
    Function,
    boolean,
    string
  ];
};
