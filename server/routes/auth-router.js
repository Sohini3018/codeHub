const express = require("express");
const userAuthControllers = require("../controllers/user-auth-controller");

const router = express.Router();

router.get("/", userAuthControllers.home);

router.post("/register", userAuthControllers.register);

router.post("/login", userAuthControllers.login);

module.exports = router;
