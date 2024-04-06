const express = require("express")
const { createBoardValidator } = require("../validators/board-validator")
const { createBoard } = require("../controllers/board-controller")
const { validation } = require("../middleware/validator-middleware.js")
const router = express.Router()

router.route("/create").post(createBoardValidator(), validation, createBoard)

module.exports = router