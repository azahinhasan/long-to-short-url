const { app } = require("../index.js"); // Adjust the path as per your project structure
const request = require("supertest");

const url = "http://www.npmjs.com/package/uuid";
const url_invalid = "hp://www.npmjs.com/package/uuid";
const url_short = "https://www.npmjs.com/package/d";
let short_url_code;
let id;

describe("URL Shorter service test", () => {
  it("should create short new url from long url", async () => {
    const res = await request(app)
      .post("/api/url")
      .send({ url })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.short_url).not.toBe("");
    expect(res.body.short_url).not.toBe(null);
    short_url_code = res.body.short_url.split("/");
    short_url_code = short_url_code[short_url_code.length - 1];
    id = res.body._id;
  });

  it("should return already exist message if existed large api send with short uri", async () => {
    const res = await request(app)
      .post("/api/url")
      .send({ url })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.short_url).not.toBe("");
    expect(res.body.message).toBe(
      "Already exist.Please run short url into browser."
    );
  });

  it("should return short url message if url is less then 20 characters", async () => {
    const res = await request(app)
      .post("/api/url")
      .send({ url: url_short })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body).not.toHaveProperty("short_url");
    expect(res.body.message).toBe("URL is too short");
  });

  it("should return error for invalid large url", async () => {
    const res = await request(app)
      .post("/api/url")
      .send({ url: url_invalid })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body).not.toHaveProperty("short_url");
    expect(res.body.message).toBe("No or Invalid URL");
  });

  it("should redirect to large url from short", async () => {
    const res = await request(app)
      .get("/" + short_url_code)
      .set("Content-Type", "application/json");

    expect(res.headers.location).toBe(url);
    expect(res.status).toBe(302);
  });

  it("should return 400 if short url not exist", async () => {
    const res = await request(app)
      .get("/" + "random_url_code")
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should delete url info from db", async () => {
    const res = await request(app)
      .delete("/api/url/" + id)
      .set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
