import React, { Component } from "react";
import "../../css/SegmentedBar.css";

import { Collapsible, CollapsibleItem } from "react-materialize";
import M from "materialize-css";
import axios from "axios";
import cToF from "../../utils/conversionUtilities";
import windSock from "../../assets/images/windSock.png";
import compassRose from "../../assets/images/compassRose.png";
import { Card, Row, Col } from "react-materialize";
import FlightCondBadge from "./FlightCondBadge";
import getTafSegmentsWithFlightCond from "../../utils/tafUtilities";
import tafSegmentedBar from "./tafSegmentedBar";

//Temp /Dew Point
//Wind Speed / Direction
//Visibility
//Altimeter
//WX type
//Cloud Layers? SKC|CLR|CAVOK|FEW|SCT|BKN|OVC|OVX (VV)
//Flight Condition (flight_category)
//Three hour pressure delta (Storm indication)
//Vertical Visibility
class MetarWeatherCard extends Component {
  state = {
    show: false,
    rawText: "",
    tafRawText: "",
    metarData: [],
    loading: true,
    tafData: [],
    tafBarData: [],
  };

  async componentDidMount() {
    const { data: metarData } = await axios.get(
      "/api/wx/point/metar/" + this.props.ident
    );
    await this.setState({ rawText: metarData.raw_text });
    await this.setState({ metarData });

    const { data: tafData } = await axios.get(
      "/api/wx/point/taf/" + this.props.ident
    );
    this.setState({ tafRawText: tafData.raw_text });
    this.setState({ tafData });
    this.setState({
      tafBarData: getTafSegmentsWithFlightCond(this.state.tafData),
    });
    this.setState({ loading: false });
  }

  componentDidUpdate() {
    let collapsible = document.querySelectorAll(".collapsible");
    let modal = document.querySelectorAll(".modal");
    M.Collapsible.init(collapsible, {});
    M.Modal.init(modal, {});

    M.AutoInit();
  }

  renderContent() {
    return (
      <Card
        className="card-content blue-grey lighten-5 z-depth-1"
        style={{
          borderRadius: "2rem",
          borderColor: "black",
          borderWidth: "5px",
          width: "25rem",
          height: "25rem",
          margin: "1rem 1rem 1rem 1rem",
        }}
      >
        <div>
          {/* <img src={'https://api.weather.gov/icons/land/day/few?size=small'} class="circle responsive-img" alt="Logo" width="50rem" height="50rem" /> */}
          <a
            href={
              "https://www.airnav.com/airport/" +
              this.state.metarData.station_id
            }
            target="_blank"
            className="card-title"
          >
            {this.props.ident}
          </a>
        </div>
        {this.state.loading ? (
          <div className="progress">
            <div className="indeterminate "></div>
          </div>
        ) : null}
        {FlightCondBadge(this.state.metarData.flight_category)}
        <div style={{ height: "1rem" }} />
        <Row>
          <Col
            className="blue-grey lighten-4"
            s={6}
            l={6}
            style={{ borderRadius: "5rem" }}
          >
            <span className="round1">
              <p>
                Baro: {parseFloat(this.state.metarData.altim_in_hg).toFixed(2)}{" "}
                inHg
              </p>
              <p>Vis: {this.state.metarData.visibility_statute_mi} kts</p>
            </span>
          </Col>
          <Col
            className="blue-grey lighten-4"
            s={6}
            l={6}
            style={{ borderRadius: "5rem" }}
          >
            <p>Temp: {cToF(this.state.metarData.temp_c)}</p>
            <p>Dew P: {cToF(this.state.metarData.dewpoint_c)}</p>
          </Col>
        </Row>
        <Row>
          <Col s={6} l={6} style={{ position: "relative" }}>
            <div style={{ position: "absolute", zIndex: 1 }}>
              <img
                src={compassRose}
                style={{ width: "50%", height: "50%", offset: "50%" }}
              ></img>
            </div>
            <div style={{ position: "absolute", zIndex: 2 }}>
              <img
                src={windSock}
                style={{
                  width: "50%",
                  height: "50%",
                  transform: `rotate(${this.state.metarData.wind_dir_degrees}deg)`,
                }}
              ></img>
            </div>
          </Col>
          <Col
            s={6}
            l={6}
            className="col s6 l6 blue-grey lighten-4"
            style={{ borderRadius: "5rem" }}
          >
            <p>Direction: {this.state.metarData.wind_dir_degrees}</p>
            <p>Speed: {this.state.metarData.wind_speed_kt}</p>
            {this.state.metarData.wind_gust_kt != null ? (
              <p>Gust: {this.state.metarData.wind_gust_kt}</p>
            ) : null}
          </Col>
        </Row>
        <div>TAF - {this.state.tafData.station_id}</div>
        <div>{tafSegmentedBar(this.state.tafBarData)}</div>
      </Card>
    );
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>{this.renderContent()}</div>
    );
  }
}

export default MetarWeatherCard;
