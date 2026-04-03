// auth.test.js

process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");

let email;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  }
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Auth Routes", () => {

  it("should register a user", async () => {
    email = `testuser+${Date.now()}@example.com`;

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email,
      password: "123456",
      role: "admin",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("email", email);
  });

  it("should login the user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email,
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});