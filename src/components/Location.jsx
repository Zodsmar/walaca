import { useState } from "react";
import CurLocation from "../functions/CurLocation";

function Location() {
  const [foundLocations, setFoundLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [curLocation, setCurLocation] = useState("");

  function findLocations(e) {
    if (search !== "") {
      //Possibly make the limit adjustable but for now I WANT IT ALL :)
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${search}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}&limit=100`
      )
        .then((res) => res.json())
        .then((res) => {
          setFoundLocations(
            res.features.map((feature, k) => (
              <p key={k}>
                {feature.properties.formatted} {feature.properties.lon}{" "}
                {feature.properties.lat}
              </p>
            ))
          );
        });
    }
  }
  function getCurLocation() {
    fetch("http://ip-api.com/json/")
      .then((res) => res.json())
      .then((res) => {
        setCurLocation(
          <p>
            {res.city} {res.country} {res.query} {res.lon} {res.lat}
          </p>
        );
      });
  }

  function updateSearch(e) {
    setSearch(e.target.value);
  }
  return (
    <div>
      <button type="button" onClick={findLocations}>
        Find Location
      </button>
      <input type="text" onChange={updateSearch}></input>
      <br />
      {foundLocations}
      <br />
      <button
        type="button"
        onClick={() => CurLocation().then((d) => setCurLocation(d))}>
        Get Current Location
      </button>
      {curLocation}
      <br />
    </div>
  );
}

export default Location;
