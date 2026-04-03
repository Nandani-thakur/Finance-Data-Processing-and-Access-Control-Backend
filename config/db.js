

// db.js

const mongoose = require("mongoose");

const connectDB = async (uri = process.env.MONGO_URI) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
    console.log("DB Connected");
  } else {
    console.log("DB already connected");
  }
};

module.exports = connectDB;