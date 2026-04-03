// errorMiddleware.js
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests per IP
  message: {
    msg: "Too many requests, please try again later."
  }
});

module.exports = limiter;