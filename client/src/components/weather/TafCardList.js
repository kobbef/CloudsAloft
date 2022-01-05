//Survey Form shows a form for a user to add input
import React, { Component } from "react";
import TafWeatherCard from "./TafWeatherCard";
import _ from "lodash";

class TafCardList extends Component {
  renderFields() {
    return _.map(this.props.idList, (id) => {
      return <TafWeatherCard key={id.station} ident={id.source} />;
    });
  }

  render() {
    return <div>{this.renderFields()}</div>;
  }
}

export default TafCardList;
