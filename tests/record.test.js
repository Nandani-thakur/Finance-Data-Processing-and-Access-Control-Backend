
process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Record = require("../models/Record");
const User = require("../models/User");

let token;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  }

  // create admin user
  const email = `recordtester+${Date.now()}@example.com`;

  await request(app).post("/api/auth/register").send({
    name: "Record Tester",
    email,
    password: "123456",
    role: "admin",
  });

  const resLogin = await request(app).post("/api/auth/login").send({
    email,
    password: "123456",
  });

  token = resLogin.body.token;
});

afterAll(async () => {
  await Record.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Record Routes", () => {

  it("should create a record", async () => {
    const res = await request(app)
      .post("/api/records")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 1000,
        type: "income",
        category: "salary",
        note: "Test record",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("amount", 1000);
  });

  it("should get records", async () => {
    const res = await request(app)
      .get("/api/records")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});