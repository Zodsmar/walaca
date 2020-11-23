async function FetchURL(url) {
  let fetched = await fetch(url);
  let res = await fetched.json();
  return res;
}

export default FetchURL;
