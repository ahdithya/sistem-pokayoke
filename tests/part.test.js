const request = require("supertest");
const app = require("../index");

describe("Part API", () => {
  it("GET /api/v1/part", async () => {
    try {
      const res = await request(app).get("/api/v1/part");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    } catch (err) {
      console.log(err);
    }
  });

  it("GET /api/v1/part/:id", async () => {
    try {
      const res = await request(app).get(
        "/api/v1/part/e671742c-1bbd-4e71-92ba-69c6a071489d"
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    } catch (err) {
      console.log(err);
    }
  });

  it("POST /api/v1/part", async () => {
    try {
      const res = await request(app).post("/api/v1/part").send({
        partNo: "C",
        partName: "B2",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("data");
    } catch (err) {
      console.log(err);
    }
  });

  it("PUT /api/v1/part/:id", async () => {
    try {
      const res = await request(app)
        .put("/api/v1/part/e671742c-1bbd-4e71-92ba-69c6a071489d")
        .send({
          partNo: "H",
          partName: "B4",
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    } catch (err) {
      console.log(err);
    }
  });

  it("DELETE /api/v1/part/:id", async () => {
    try {
      const res = await request(app).delete(
        "/api/v1/part/8b618d17-b826-4873-8aba-65c2f849c044"
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
    } catch (err) {
      console.log(err);
    }
  });
});
