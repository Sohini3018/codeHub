const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Hello!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const userData = req.body;
    const userExist = await User.findOne({ email: userData.email });

    if (userExist) {
      res.status(400).json({ message: "User already exists" });
    } else {
      // Hashing the password before storing it
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      const newUser = await User.create(userData);
      const userFound = await User.findById(newUser._id).select("-password")
      if (!userFound) {
        return res.status(500).json({
          statusCode: 500,
          message: "Failed to create user"
        })
      }
      const token = await newUser.generateToken();
      res.status(201).json({ message: "User created successfully", data: userFound, token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;
    const userExist = await User.findOne({ email: userData.email });
    console.log(userExist);

    if (!userExist) {
      res.status(400).json({ message: "Invalid Credentials" });
    } else {
      const isValidPassword = await bcrypt.compare(
        userData.password,
        userExist.password
      );

      if (isValidPassword) {
        const token = await userExist.generateToken();
        const userFound = await User.findById(userExist._id).select("-password")
        res.status(200).json({ message: "Login successful", data: userFound, token });
      } else {
        res.status(401).json({ message: "Invalid Email or Password." });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { home, register, login };
