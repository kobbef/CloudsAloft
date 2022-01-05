//Survey Form shows a form for a user to add input
import React, { Component } from "react";
import _ from "lodash";
import AirportChip from "./AirportChip";
import { Button } from "react-materialize";

class AirportChipList extends Component {
  renderFields() {
    return _.map(this.props.airportList, (ident) => {
      return (
        <Button
          key={ident.source}
          className="chip blue lighten-3"
          onClick={() => this.props.onChipDelete(ident.station)}
        >
          {ident.station}
          <i className="material-icons right">close</i>
        </Button>
      );
    });
  }

  render() {
    return <div>{this.renderFields()}</div>;
  }
}

export default AirportChipList;
