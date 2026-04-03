// user.test.js

process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");

let token;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // create admin user
  const email = `usertester+${Date.now()}@example.com`;
  await request(app).post("/api/auth/register").send({
    name: "User Tester",
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
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("User API", () => {
  it("should get all users", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});