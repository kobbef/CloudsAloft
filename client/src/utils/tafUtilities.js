//
//  raw_text: 'KLAX 220300Z 2203/2306 01006KT P6SM SKC FM220400 01015G25KT P6SM SKC WS015/04040KT FM221200 01010KT P6SM SKC FM221500 VRB03KT P6SM SKC FM222000 26008KT P6SM SKC',
//  station_id: 'KLAX',
//  issue_time: '2022-01-22T03:00:00Z',
//  bulletin_time: '2022-01-22T03:00:00Z',
//  valid_time_from: '2022-01-22T03:00:00Z',
//  valid_time_to: '2022-01-23T06:00:00Z',
//  remarks: 'AMD',
//  latitude: '33.93',
//  longitude: '-118.38',
//  elevation_m: '30.0',
//  forecast: [
//    {
//      fcst_time_from: '2022-01-22T03:00:00Z',
//      fcst_time_to: '2022-01-22T04:00:00Z',
//      wind_dir_degrees: '10',
//      wind_speed_kt: '6',
//      visibility_statute_mi: '6.21',
//      sky_condition: [Object]
//    },
//    {
//      fcst_time_from: '2022-01-22T04:00:00Z',
//      fcst_time_to: '2022-01-22T12:00:00Z',
//      change_indicator: 'FM',
//      wind_dir_degrees: '10',
//      wind_speed_kt: '15',
//      wind_gust_kt: '25',
//      wind_shear_hgt_ft_agl: '1500',
//      wind_shear_dir_degrees: '40',
//      wind_shear_speed_kt: '40',
//      visibility_statute_mi: '6.21',
//      sky_condition: [Object]
//    },
//    {
//      fcst_time_from: '2022-01-22T12:00:00Z',
//      fcst_time_to: '2022-01-22T15:00:00Z',
//      change_indicator: 'FM',
//      wind_dir_degrees: '10',
//      wind_speed_kt: '10',
//      visibility_statute_mi: '6.21',
//      sky_condition: [Object]
//    },
//    {
//      fcst_time_from: '2022-01-22T15:00:00Z',
//      fcst_time_to: '2022-01-22T20:00:00Z',
//      change_indicator: 'FM',
//      wind_dir_degrees: '0',
//      wind_speed_kt: '3',
//      visibility_statute_mi: '6.21',
//      sky_condition: [Object]
//    },
//    {
//      fcst_time_from: '2022-01-22T20:00:00Z',
//      fcst_time_to: '2022-01-23T06:00:00Z',
//      change_indicator: 'FM',
//      wind_dir_degrees: '260',
//      wind_speed_kt: '8',
//      visibility_statute_mi: '6.21',
//      sky_condition: [Object]
//    }
//  ]
//}

export function getTafSegments(TAF) {
  //  valid_time_from: '2022-01-22T03:00:00Z',
  //  valid_time_to: '2022-01-23T06:00:00Z',
  const startTime = Date.parse(TAF["valid_time_from"]);
  const endTime = Date.parse(TAF["valid_time_to"]);
  const totalTime = endTime - startTime;
  var forecasts = TAF["forecast"];

  var percentages = [];
  for (var i = 0; i < forecasts.length; i++) {
    var fcstEndTime = Date.parse(forecasts[i]["fcst_time_to"]);
    var fcstStartTime = Date.parse(forecasts[i]["fcst_time_from"]);
    var percent = (fcstEndTime - fcstStartTime) / totalTime;
    percent *= 100;
    percentages.push(percent);
  }

  return percentages;
}

export default function getTafSegmentsWithFlightCond(TAF) {
  // LIFR = < 500' ceiling || < 1 mile, Magenta
  // IFR = 500' to < 1000' || vis 1 - < 3 miles, Red
  // MVFR = 1,000 to 3,000 || vis [3-5] blue
  //VFR = > 3000 && vis > 5 miles green
  //sky_condition
  //{sky_cover: 'FEW', cloud_base_ft_agl:'20000' }

  const startTime = Date.parse(TAF["valid_time_from"]);
  const endTime = Date.parse(TAF["valid_time_to"]);
  const totalTime = endTime - startTime;
  var forecasts = TAF["forecast"];

  var segments = [];
  for (var i = 0; i < forecasts.length; i++) {
    var options = { hour: "numeric", minute: "numeric" };
    var fcstEndTime = Date.parse(forecasts[i]["fcst_time_to"]);
    var fcstStartTime = Date.parse(forecasts[i]["fcst_time_from"]);
    var startDate = new Date(forecasts[i]["fcst_time_from"]);
    var endDate = new Date(forecasts[i]["fcst_time_to"]);
    var startString = startDate.toLocaleTimeString(navigator.language, {
      hour: "numeric",
      minute: "2-digit",
    });
    var endString = endDate.toLocaleTimeString(navigator.language, {
      hour: "numeric",
      minute: "2-digit",
    });
    var percent = (fcstEndTime - fcstStartTime) / totalTime;
    percent *= 100;
    var flightCond;
    var vis = parseFloat(forecasts[i].visibility_statute_mi);
    if (
      forecasts[i].sky_condition.sky_cover === "BKN" ||
      forecasts[i].sky_condition.sky_cover === "OVC"
    ) {
      var ceiling = parseInt(forecasts[i].sky_condition.cloud_base_ft_agl);

      if (ceiling < 500 || vis < 1) {
        flightCond = "LIFR";
      } else if (ceiling < 1000 || vis < 3) {
        flightCond = "IFR";
      } else if (ceiling < 3000 || vis <= 5) {
        flightCond = "MVFR";
      } else if (ceiling >= 3000 && vis > 5) {
        flightCond = "VFR";
      }
    } else {
      if (vis < 1) {
        flightCond = "LIFR";
      } else if (vis < 3) {
        flightCond = "IFR";
      } else if (vis <= 5) {
        flightCond = "MVFR";
      } else if (vis > 5) {
        flightCond = "VFR";
      }
    }
    var prcntAndFlightCond = {
      percent: percent,
      flightCond: flightCond,
      startTime: startString,
      endTime: endString,
    };

    segments.push(prcntAndFlightCond);
  }
  return segments;
}
