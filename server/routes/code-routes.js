const express = require("express")
const { createCode } = require("../controllers/code-controller.js")

const router = express.Router()

router.route("/create").post(createCode)

module.exports = router