import { Component } from "react";

class Location extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: "",
            foundlocations: []
        }
    }

    findLocations(e) {
        if(this.state.search != ""){
            this.setState({foundlocations: []
            }, () => (
                //Possibly make the limit adjustable but for now I WANT IT ALL :)
                fetch("https://api.geoapify.com/v1/geocode/search?text=" + this.state.search + "&apiKey=" + process.env.REACT_APP_GEOAPIFY_API_KEY + "&limit=100")
                .then(res => res.json())
                .then((res) => {
                    this.setState(state => {
                        const locations = state.foundlocations.concat(res.features.map((feature, k) => (
                            <p key={k}>{feature.properties.formatted} {feature.properties.lon} {feature.properties.lat}</p>
                            )));

                        return({locations});
                    });
                })
            ));
        }
    }
    getCurrLocation(){
        this.setState({curLocation: ""
        }, () => (
            fetch("http://ip-api.com/json/")
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                this.setState({
                    curLocation: <p>{res.city} {res.country} {res.query} {res.lon} {res.lat}</p>
                });
            })
        ));
    }

    setSearch(e) {
        this.setState({
              search: e.target.value 
        });
    }

    render(){
        return (
            <div>
                <button type="button" onClick={this.findLocations.bind(this)}>Find Location</button>
                <input type="text" onChange={this.setSearch.bind(this)}></input><br/>
                {this.state.locations}<br/>
                <button type="button" onClick={this.getCurrLocation.bind(this)}>Get Current Location</button><br/>
                {this.state.curLocation}
            </div>
        );

    }
}

export default Location;