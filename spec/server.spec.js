let request = require("request");

describe("calc", () => {
  it("should mutiply 2 and 2", () => {
    expect(2 * 2).toBe(4);
  });
});

describe("get messages", () => {
  beforeAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  });
  it("should return 200 ok", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  it("List should return not empty", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      expect(res.body.length).toBeGreaterThan(2);
      done();
    });
  });
});
