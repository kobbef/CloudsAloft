import React, { Component } from "react";
import TafWeatherCard from "./weather/TafWeatherCard";
import MetarWeatherCard from "./weather/MetarWeatherCard";
import AirportSearchBar from "./weather/AirportSearch";
import axios from "axios";
import MetarCardList from "./weather/MetarCardList";
import TafCardList from "./weather/TafCardList";
import AirportChipList from "./weather/AirportChipList";

class Landing extends Component {
  state = {
    metarList: ["KLAX", "KMCI", "KSEA"],
    searchAirport: "",
    loading: true,
  };

  async updateSearchString(event) {
    const val = event.target.value;
    await this.setState({ searchAirport: val });
  }

  async updateAirports(event) {
    const val = event.target.value;
    await this.setState({ searchAirport: val });
    const { data: metar } = await axios.get(
      "/api/wx/point/metar/" + this.state.searchAirport
    );
    const airportData = {
      station: this.state.searchAirport,
      source: metar.station_id,
      lat: metar.latitude,
      lon: metar.longitude,
    };

    this.setState({ metarList: [...this.state.metarList, airportData] });
  }

  removeAirport = async (ident) => {
    this.setState({
      metarList: this.state.metarList.filter(function (airport) {
        return airport.source !== ident;
      }),
    });
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { data: metarList } = await axios.get(
          "/api/wx/point/metar/" +
            position.coords.latitude +
            "/" +
            position.coords.longitude
        );
        var airportData = [];
        for (var i = 0; i < metarList.length; i++) {
          airportData.push({
            station: metarList[i].station_id,
            source: metarList[i].station_id,
            lat: metarList[i].latitude,
            lon: metarList[i].longitude,
          });
        }
        this.setState({ metarList: airportData });
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <label>Enter Airport Code</label>

          {/* onChangeCapture={ event => this.updateAirports(event) } */}
          <input
            value={this.state.searchAirport}
            onChange={(event) => this.updateSearchString(event)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                this.updateAirports(event);
              }
            }}
            style={{ width: "5rem", marginLeft: "5px" }}
          />
          <AirportChipList
            airportList={this.state.metarList}
            onChipDelete={this.removeAirport}
          />
        </div>
        <div>
          <h5>METAR</h5>
          {this.state.loading ? (
            <div className="progress">
              <div className="indeterminate blue lighten-3"></div>
            </div>
          ) : null}
          {!this.state.loading ? (
            <div>
              <MetarCardList idList={this.state.metarList} />
            </div>
          ) : null}
        </div>
        {/* <h5>TAF</h5>
            { this.state.loading ? <div className="progress" >
                        <div className="indeterminate"></div>
                </div> : null }
                { !this.state.loading ? <div >
                    <TafCardList idList={this.state.metarList} />
                </div> : null }
            </div>
            <div className="col s12 m6 l3">
                <h5>MOS</h5>
                <div >
                    <div className="child">
                    <TafWeatherCard ident="KSEA"/>
                    <TafWeatherCard ident="KLAX"/>
                    </div>
                </div>
            </div> */}
      </div>
    );
  }
}
export default Landing;
