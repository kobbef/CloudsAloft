//Survey Form shows a form for a user to add input
import React, { Component } from "react";
import MetarWeatherCard from "./MetarWeatherCard";
import _ from "lodash";

class MetarCardList extends Component {
  renderFields() {
    return _.map(this.props.idList, (id) => {
      return (
        <MetarWeatherCard key={id.source + id.station} ident={id.source} />
      );
    });
  }

  render() {
    return <div>{this.renderFields()}</div>;
  }
}

export default MetarCardList;
