const {fetchMyIP} = require('./lib/iss');

fetchMyIP((err, ip) => {
  console.log("My IP is", ip);
});