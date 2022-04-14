const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./lib/iss');

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
      console.log(passes);
    });
  });
});
