import { useState } from "react";
import arrow from "../assets/arrow.svg";
import { FetchURL } from "../functions/Utilities";
import "./Currency.css";

function Currency() {
  const currencies = [
    "CAD",
    "GBP",
    "EUR",
    "USD",
    "MXN",
    "AUD",
    "HKD",
    "IDR",
    "ILS",
    "DKK",
    "INR",
    "CHF",
    "CZK",
    "SGD",
    "THB",
    "HRK",
    "MYR",
    "NOK",
    "CNY",
    "BGN",
    "PHP",
    "PLN",
    "ZAR",
    "ISK",
    "BRL",
    "RON",
    "NZD",
    "TRY",
    "JPY",
    "RUB",
    "KRW",
    "HUF",
    "SEK",
  ];

  const [converted, setConverted] = useState("");
  const [value, setValue] = useState("");
  const [base, setBase] = useState("CAD");
  const [currency, setCurrency] = useState("CAD");

  function updateState(e, state) {
    state(e.target.value);
  }

  function convert() {
    FetchURL(`https://api.ratesapi.io/api/latest?base=${base}`).then((res) => {
      setConverted(
        ((res.rates[currency] ? res.rates[currency] : 1) * value).toFixed(2)
      );
    });
  }

  return (
    <div>
      <div className="container">
        <div className="flex-container">
          <div className="contentFrom">
            <input
              className="textFrom"
              type="text"
              name="convertFrom"
              onChange={(e) => updateState(e, setValue)}></input>
            <select
              className="selectFrom"
              name="convertFrom"
              value={base}
              onChange={(e) => updateState(e, setBase)}>
              {currencies.map((value, i) => (
                <option className="optionFrom" key={i} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="arrowContent">
            <img className="arrow" src={arrow} alt="Arrow" />
          </div>
          <div className="contentTo">
            <select
              className="selectTo"
              name="convertTo"
              onChange={(e) => updateState(e, setCurrency)}>
              {currencies.map((value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <input
              className="textTo"
              type="text"
              name="convertTo"
              readOnly="readonly"
              value={converted}></input>
          </div>
        </div>
        <div className="buttonContainer">
          <button className="button" type="button" onClick={convert}>
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}

export default Currency;
