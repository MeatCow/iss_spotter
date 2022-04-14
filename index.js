const {fetchMyIP, fetchCoordsByIP} = require('./lib/iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log(err);
    return;
  }
  fetchCoordsByIP(ip, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
  });
});