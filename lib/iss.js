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
  const COORDS_ENDPOINT = `https://api.freegeoip.app/json?apikey=${API_KEY}`;
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

module.exports = {fetchMyIP, fetchCoordsByIP};