const request = require("request-promise-native");
require('dotenv').config();
const IPV4_ENDPOINT = "https://api.ipify.org?format=json";
const API_KEY = process.env.GEO_IP_API_KEY;
const ISS_NORAD_ID = 25544;

const fetchMyIP = function() {
  return request(IPV4_ENDPOINT);
};

const fetchCoordsByIP = (body) => {
  const IP = JSON.parse(body).ip;
  const COORDS_ENDPOINT = `https://api.freegeoip.app/json/${IP}?apikey=${API_KEY}`;
  return request(COORDS_ENDPOINT);
};

const fetchISSFlyOverTimes = (body) => {
  const {latitude, longitude} = JSON.parse(body);
  const PASS_ENDPOINT = `https://api.g7vrd.co.uk/v1/satellite-passes/${ISS_NORAD_ID}/${latitude}/${longitude}.json`;
  return request(PASS_ENDPOINT);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const passes = JSON.parse(data).passes;
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
      return formattedPasses;
    });
};

module.exports = { nextISSTimesForMyLocation };