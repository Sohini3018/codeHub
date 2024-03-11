const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
