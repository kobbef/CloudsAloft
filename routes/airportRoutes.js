const axios = require("axios");
const xmlParser = require("xml2json");

//https://www.airport-data.com/api/ap_info.json?icao=KJFK

module.exports = (app) => {
  app.get("/api/apt/:ident", async (req, res) => {
    var airportUrl = "https://www.airport-data.com/api/ap_info.json?icao=";
    airportUrl = airportUrl + req.params.ident;
    try {
      axios.get(airportUrl).then((airportRes) => {
        res.send(airportRes.data);
      });
    } catch (error) {
      console.log(error);
    }
  });
};
