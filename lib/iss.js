const request = require("request");

const fetchMyIP = function(callback) {
  const IPV4_ENDPOINT = "https://api.ipify.org?format=json";
  request(IPV4_ENDPOINT, (err, res, body) => {
    if (err) {
      callback(err, null);
    }
    const ip = JSON.parse(body).ip;
    callback(err, ip);
  });
};

module.exports = {fetchMyIP};