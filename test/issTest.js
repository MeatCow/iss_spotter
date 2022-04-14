const { fetchMyIP } = require("../lib/iss");
const { assert } = require('chai');

describe('fetchMyIp', () => {
  it('should return current public ip, via callback', (done) => {
    fetchMyIP((err, ip) => {
      const expectedIp = "74.57.179.41";
      assert.equal(err, null);
      assert.equal(expectedIp, ip);
      done();
    });
  });

});