const express = require("express");
const User = require('../models/user-model');

const home = async (req, res) => {
    try {
        res.status(200).send("Hello!");
    } catch (error) {
        console.log(error);
    }
  
};

const register = async (req, res) => {
    try {
      const userData = req.body;
      const userExist = await User.findOne({ email: userData.email });
  
      if (userExist) {
        res.status(400).json({ message: "User already exists" });
      } else {
        await User.create(userData);
        console.log("User created successfully");
        res.status(201).json({ userData });
      }
    } catch (err) {
      res.status(500).json({ err });
    }
  };

module.exports = { home, register };
