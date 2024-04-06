const express = require("express")
const { createBoardValidator, updateBoardValidator } = require("../validators/board-validator")
const { createBoard, updateBoard } = require("../controllers/board-controller")
const { validation } = require("../middleware/validator-middleware.js")
const router = express.Router()

router.route("/create").post(createBoardValidator(), validation, createBoard)
router.route("/update").patch(updateBoardValidator(), validation, updateBoard)

module.exports = router