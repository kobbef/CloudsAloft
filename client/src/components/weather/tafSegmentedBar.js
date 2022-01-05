import { Modal, Button } from "react-materialize";

const tafSegmentedBar = (segmentData) => {
  // LIFR = < 500' ceiling || < 1 mile, Magenta
  // IFR = 500' to < 1000' || vis 1 - < 3 miles, Red
  // MVFR = 1,000 to 3,000 || vis [3-5] blue
  //VFR = > 3000 && vis > 5 miles green

  const segments = [];
  const times = [];
  for (var i = 0; i < segmentData.length; i++) {
    var prcnt = Math.ceil(segmentData[i].percent) + "%";
    var styleObj = {
      width: prcnt,
      height: "1rem",
    };
    var color;
    switch (segmentData[i].flightCond) {
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
    var classNameObj = color + " pill btn-floating";
    segments.push(<div key={i} style={styleObj} className={classNameObj} />);
    var timeString = segmentData[i].startTime; //+ "-" + segmentData[i].endTime;
    //times.push( <div key={i*2} style={{width:{prcnt}}} className='pill'>{timeString}</div>);
    times.push(
      <div
        key={i * 2}
        style={{ width: prcnt, textAlign: "right" }}
        className="pill"
      >
        {segmentData[i].endTime}
      </div>
    );
  }
  return (
    <div>
      <div className="row">
        <div className="col chart s12">{segments}</div>
      </div>
      {/* <div className='row'>
                <div className='col chart s12'>
                    {times}
                </div>
            </div> */}
    </div>
  );
};

export default tafSegmentedBar;
