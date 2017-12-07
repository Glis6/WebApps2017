let Request = require('request');

describe("server", () => {
  let server;
  beforeAll(() => {
    server = require('../app');
  });
  describe("GET /API/drawings", () => {
    let data = {};
    beforeAll((done) => {
      Request({
          method: 'GET',
          uri: 'http://localhost:3000/API/drawings',
          json: true,
          body: [{'name': 'Test'}]
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
    });
    it("status 200", () => {
      expect(data.status).toBe(200);
    });
    it("check drawing body", () => {
      expect(data.body.length).toBe(0);
    });
  });
});
