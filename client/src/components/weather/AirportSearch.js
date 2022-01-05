import React from "react";

const AirportSearchBar = ({ ident, onChange }) => {
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
  };
  return (
    <div class="input-field">
      {/* onChange={ event => onChange(event)} */}
      <input
        id="email"
        value={ident}
        type="email"
        class="validate"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onChange(event);
          }
        }}
      />
      <label for="email">Email</label>
      <span class="helper-text" data-error="wrong" data-success="right">
        Helper text
      </span>
    </div>
  );
};

export default AirportSearchBar;
