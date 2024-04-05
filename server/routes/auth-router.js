const express = require("express");
const userAuthControllers = require("../controllers/user-auth-controller");
const { UserRegisterValidator } = require("../validators/user-validator.js")
const { validation } = require("../middleware/validator-middleware.js")

const router = express.Router();

router.get("/", userAuthControllers.home);

router.post("/register", UserRegisterValidator(), validation, userAuthControllers.register);

router.post("/login", userAuthControllers.login);

module.exports = router;
