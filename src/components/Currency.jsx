import { Component } from "react";
import arrow from "../assets/arrow.svg"
import './Currency.css';

class Currency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: [
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
                "SEK"
            ],
            base: "CAD",
            converted: "",
            value: "",
            currency: "CAD"
        }
    }

    getBase(e) {
        this.setState({
            base: e.target.value
        });
       
    }

    updateValue(e) {
        this.setState({
            value: e.target.value
        });
    }

    getCurrency(e) {
        this.setState({
            currency: e.target.value
        });
    }

    convert() {
        fetch("https://api.ratesapi.io/api/latest?base=" + this.state.base)
            .then(res => res.json())
            .then((res) => {
                //ToFixed isn't 100% accurate
                this.setState({
                    converted: (res.rates[this.state.currency] * this.state.value).toFixed(2)
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="flex-container">
                    <div className="contentFrom">
                        <input className="textFrom"type="text" name="convertFrom" onChange={this.updateValue.bind(this)}></input>
                        <select className="selectFrom"name="convertFrom" value={this.state.base} onChange={this.getBase.bind(this)}>
                            {
                                this.state.currencies.map((value, i) => (
                                    <option className="optionFrom" key={i} value={value}>{value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="arrowContent">
                    <img className="arrow" src={arrow} alt="Arrow" />
                    </div>
                    <div className="contentTo">
                        <select className="selectTo" name="convertTo" onChange={this.getCurrency.bind(this)}>
                            {
                                this.state.currencies.map((value, i) => (
                                    <option key={i} value={value}>{value}</option>
                                ))
                            }
                        </select>
                        <input className="textTo" type="text" name="convertTo" readOnly="readonly" value={this.state.converted}></input>
                    </div>

                    
                </div>
                <div className="buttonContainer">
                    <button className="button" type="button" onClick={this.convert.bind(this)}>Convert</button>
                </div>
            </div>
        );
    }
}

export default Currency;