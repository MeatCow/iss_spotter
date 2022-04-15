const request = require("request");
require('dotenv').config();

const fetchMyIP = function(callback) {
  const IPV4_ENDPOINT = "https://api.ipify.org?format=json";
  request(IPV4_ENDPOINT, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (res.statusCode !== 200) {
      const errMsg = `Status code ${res.statusCode} when fetching IP. Response body: ${body}`;
      callback(Error(errMsg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(err, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const API_KEY = process.env.GEO_IP_API_KEY;
  const COORDS_ENDPOINT = `https://api.freegeoip.app/json/${ip}?apikey=${API_KEY}`;
  request(COORDS_ENDPOINT, (err, res, body) => {
    if (err) {
      callback(err, null);
    }

    if (res.statusCode !== 200) {
      const errMsg = `Status code ${res.statusCode} when fetching IP. Response body: ${body}`;
      callback(Error(errMsg), null);
    }

    const data = JSON.parse(body);
    callback(err, data);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const ISS_NORAD_ID = 25544;
  const PASS_ENDPOINT = `https://api.g7vrd.co.uk/v1/satellite-passes/${ISS_NORAD_ID}/${coords.latitude}/${coords.longitude}.json`;


  request(PASS_ENDPOINT, (err, res, body) => {
    if (err) {
      callback(err, null);
    }

    if (res.statusCode !== 200) {
      const errMsg = `Status code ${res.statusCode} when fetching IP. Response body: ${body}`;
      callback(Error(errMsg), null);
    }
    
    const passes = JSON.parse(body).passes;
    const formattedPasses = [];

    for (let pass of passes) {
      const risetime = new Date(pass.start).getTime();
      const endTime = new Date(pass.end).getTime();
      let duration = (endTime - risetime) / 1000;
  
      formattedPasses.push({
        risetime,
        duration
      });
    }

    callback(err, formattedPasses);
  });

};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) {
      console.log(err);
      return;
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        console.log(err);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, passes) => {
        if (err) {
          console.log(err);
          return;
        }
        callback(err, passes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };