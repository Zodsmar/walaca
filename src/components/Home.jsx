import React from "react";
import WeatherWidget from "./WeatherWidget.jsx";

function Home() {
  let widgetStyle = {
    width: `20%`,
    height: `500px`,
    padding: `25px`,
    background: `aliceblue`,
    borderRadius: `25px`,
    margin: `10px`,
    float: `left`,
  };

  return (
    <div className="widgetContainer">
      <WeatherWidget widgetStyle={widgetStyle} />
    </div>
  );
}

export default Home;
