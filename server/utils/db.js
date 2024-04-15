const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
};

module.exports = connectDB;
