import React, { useState } from "react";
import FetchURL from "../functions/FetchURL";

function Weather() {
  const [curWeather, setCurWeather] = useState("");

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function getWeather() {
    FetchURL("http://ip-api.com/json/").then((res) => {
      let lat = res.lat;
      let lon = res.lon;
      let part = "minutely";
      let units = "metric";
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=${units}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          let timestampMilli = res.current.dt * 1000;
          let date = new Date(timestampMilli);
          let displayDate =
            date.getMonth() +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear() +
            " " +
            formatAMPM(date);
          setCurWeather(
            <p>
              {displayDate} {res.current.temp} {res.current.weather[0].main}{" "}
              {JSON.stringify(res.alerts)}
            </p>
          );
        })
        .catch((error) => {
          //By mistake I looped the calls and used all calls for the day from the free OPEN WEATHER API woops...
          console.error("Couldn't fetch probably used up all calls!");
        });
    });
  }

  return (
    <div>
      <button type="button" onClick={getWeather}>
        Get Weather
      </button>
      {curWeather}
    </div>
  );
}

export default Weather;
