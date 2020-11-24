import React, { useState, useEffect } from "react";
import {
  FetchURL,
  getDayOfWeek,
  getMonthName,
} from "../functions/Utilities.jsx";

function WeatherWidget(props) {
  const [curWeather, setCurWeather] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    getWeather("metric");
  }, []);

  function getDate(dt) {
    let timestampMilli = dt.current.dt * 1000;
    let d = new Date(timestampMilli);
    let displayDate =
      getDayOfWeek(d) +
      ", " +
      getMonthName(d) +
      " " +
      d.getDate() +
      ", " +
      d.getFullYear();
    return displayDate;
  }

  function getWeather(units) {
    FetchURL("http://ip-api.com/json/").then((ip) => {
      let lat = ip.lat;
      let lon = ip.lon;
      let part = "minutely";
      FetchURL(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=${units}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      )
        .then((res) => {
          setDate(getDate(res));
          setCurWeather(res);
          setLocation(ip);
        })
        .catch((error) => {
          //By mistake I looped the calls and used all calls for the day from the free OPEN WEATHER API woops...
          console.error(error, "Couldn't fetch probably used up all calls!");
        });
    });
  }

  return (
    <div style={props.widgetStyle}>
      {curWeather !== "" && location !== "" && (
        <>
          <img
            src={`http://openweathermap.org/img/wn/${curWeather.current.weather[0].icon}@4x.png`}
            alt="icon"
          />
          <div>{date}</div>
          <div>
            {location.city}, {location.country}
          </div>
          <div>{Math.round(curWeather.current.temp)}°C</div>
          <div>{curWeather.current.weather[0].main}</div>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
