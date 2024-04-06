const express = require("express")
const { createCode, updateCode } = require("../controllers/code-controller.js")
const { createCodeValidator } = require("../validators/code-validator.js")
const { validation } = require("../middleware/validator-middleware.js")

const router = express.Router()

router.route("/create").post(createCodeValidator(), validation, createCode)
router.route("/update").post(createCodeValidator(), validation, updateCode)

module.exports = router