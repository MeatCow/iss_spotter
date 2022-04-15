const { nextISSTimesForMyLocation } = require('./lib/iss');

nextISSTimesForMyLocation((err, passes) => {
  if (err) {
    console.log(err);
    return;
  }

  for (let pass of passes) {
    const time = new Date(pass.risetime);
    console.log(`Next pass at ${time} for ${pass.duration} seconds`);
  }
});