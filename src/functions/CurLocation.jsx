async function CurLocation() {
  let fetched = await fetch("http://ip-api.com/json/");
  let res = await fetched.json();

  return (
    <p>
      {res.city} {res.country} {res.query} {res.lon} {res.lat}
    </p>
  );
}

export default CurLocation;
