const express = require("express")
const { createCode, updateCode, getCode } = require("../controllers/code-controller.js")
const { createCodeValidator, getCodeValidator } = require("../validators/code-validator.js")
const { validation } = require("../middleware/validator-middleware.js")

const router = express.Router()

router.route("/create").post(createCodeValidator(), validation, createCode)
router.route("/update").patch(createCodeValidator(), validation, updateCode)
router.route("/getCode/:roomId").get(getCodeValidator(), validation, getCode)

module.exports = router