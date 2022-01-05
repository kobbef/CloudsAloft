const axios = require("axios");
const { json } = require("body-parser");
const xmlParser = require("xml2json");
const keys = require("../config/keys");

//https://www.airport-data.com/api/ap_info.json?icao=KJFK

module.exports = (app) => {
  //        Route         Middleware    Handler
  app.get("/api/wx/point/taf/:ident", async (req, res) => {
    var tafUrl =
      "https://aviationweather.gov/adds/dataserver_current/httpparam?datasource=tafs&requestType=retrieve&format=xml&mostRecentForEachStation=true&hoursBeforeNow=2&stationString=";
    tafUrl = tafUrl + req.params.ident;
    try {
      const tafRes = await axios.get(tafUrl);
      const json = JSON.parse(xmlParser.toJson(tafRes.data));
      if (json.response.data.num_results > 0) {
        res.send(json.response.data.TAF);
      } else {
        var icaoUrl = "https://api.checkwx.com/station/" + req.params.ident;
        let headers = { "x-api-key": "9640e5db21634f16bd3aacc0fd" };
        const icao = await axios.get(icaoUrl, { headers });
        const lat = icao.data.data[0].latitude.decimal;
        const lon = icao.data.data[0].longitude.decimal;
        var dist = 20;
        var nrstUrl =
          "https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&radialDistance=" +
          dist +
          ";" +
          lon +
          "," +
          lat +
          "&hoursBeforeNow=2";
        try {
          axios.get(nrstUrl).then((tafRes) => {
            const json = JSON.parse(xmlParser.toJson(tafRes.data));
            var tafs = json.response.data.TAF;
            res.send(tafs[0]);
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/api/wx/point/metar/:ident", async (req, res) => {
    var metarUrl =
      "https://aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requestType=retrieve&format=xml&mostRecentForEachStation=true&hoursBeforeNow=2&stationString=";
    metarUrl = metarUrl + req.params.ident;
    try {
      const metarRes = await axios.get(metarUrl);
      const json = JSON.parse(xmlParser.toJson(metarRes.data));
      //
      if (json.response.data.num_results > 0) {
        res.send(json.response.data.METAR);
      } else {
        var icaoUrl = "https://api.checkwx.com/station/" + req.params.ident;
        let headers = { "x-api-key": "9640e5db21634f16bd3aacc0fd" };
        const icao = await axios.get(icaoUrl, { headers });
        const lat = icao.data.data[0].latitude.decimal;
        const lon = icao.data.data[0].longitude.decimal;
        var dist = 20;
        var nrstUrl =
          "https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&radialDistance=" +
          dist +
          ";" +
          lon +
          "," +
          lat +
          "&hoursBeforeNow=2";
        try {
          axios.get(nrstUrl).then((metarRes) => {
            const json = JSON.parse(xmlParser.toJson(metarRes.data));
            var metars = json.response.data.METAR;
            console.log(metars[0]);
            res.send(metars[0]);
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  //https://www.nws.noaa.gov/cgi-bin/lamp/getlav.pl?sta=KGCK
  //https://api.weather.gov/points/39.7456,-97.0892
  //https://api.weather.gov/gridpoints/TOP/31,80/forecast/hourly
  //->'observationStations'->https://api.weather.gov/zones/forecast/NEZ087 ->observationStations->https://api.weather.gov/stations/KHJH

  app.get("/api/wx/point/metar/:lat/:lon", async (req, res) => {
    var dist = 20;
    var lat = req.params.lat;
    var lon = req.params.lon;

    var metarUrl =
      "https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&radialDistance=" +
      dist +
      ";" +
      lon +
      "," +
      lat +
      "&hoursBeforeNow=2";
    try {
      axios.get(metarUrl).then((metarRes) => {
        const json = JSON.parse(xmlParser.toJson(metarRes.data));
        var metars = json.response.data.METAR;
        var metarStations = [];
        for (var i = 0; i < metars.length; i++) {
          metarStations.push(metars[i]);
        }
        //var uniqueStations = metarStations.filter( ( value, index, self ) => { return self.indexOf(value) === index } );
        var uniqueStations = metarStations.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.station_id === value.station_id &&
                t.station_id === value.station_id
            )
        );
        res.send(uniqueStations);
      });
    } catch (error) {
      console.log(error);
    }
  });
};
