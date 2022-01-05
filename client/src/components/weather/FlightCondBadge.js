const FlightCondBadge = (flightCond) => {
  var color = "";
  switch (flightCond) {
    case "IFR":
      color = "red darken-4";
      break;
    case "LIFR":
      color = "pink darken-4";
      break;
    case "MVFR":
      color = "light-blue darken-4";
      break;
    case "VFR":
      color = "green";
      break;
    default:
      color = "green";
  }
  const classType = color + " container";
  return (
    <div className={classType} style={{ borderRadius: "5rem", width: "25%" }}>
      {flightCond}
    </div>
  );
};

export default FlightCondBadge;
