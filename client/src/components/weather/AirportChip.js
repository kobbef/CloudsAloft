//Survey Field contains logic to render a single label and text input

import React from "react";
import { Chip, Icon } from "react-materialize";

const AirportChip = ({ onChipDelete, label }) => {
  //{...input}== onBlur={input.onBlur} onChange={input.onChange}
  return (
    <div className="chip blue lighten-3" onClick={onChipDelete}>
      label
    </div>
  );
};

export default AirportChip;
