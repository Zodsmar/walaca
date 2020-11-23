import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Currency from "./components/Currency.jsx";
import Location from "./components/Location.jsx";
import Weather from "./components/Weather.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <ul>
            <li>
              <Link className="menu" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="menu" to="/currency">
                Currency
              </Link>
            </li>
            <li>
              <Link className="menu" to="/location">
                Location
              </Link>
            </li>
            <li>
              <Link className="menu" to="/weather">
                Weather
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/currency">
            <Currency />
          </Route>
          <Route path="/location">
            <Location />
          </Route>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path="/">
            <h2>HOME</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
