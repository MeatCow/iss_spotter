const { nextISSTimesForMyLocation } = require('./lib/iss_promised');

const printPassTimes = (passTimes) => {
  for (let pass of passTimes) {
    const time = new Date(pass.risetime);
    console.log(`Next pass at ${time} for ${pass.duration} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then(printPassTimes)
  .catch((err) => {
    console.log(`Error during lookup =>`, err.message);
  });