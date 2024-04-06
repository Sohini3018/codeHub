const express = require("express")
const { createBoardValidator, updateBoardValidator, getBoardContentValidator } = require("../validators/board-validator")
const { createBoard, updateBoard, getBoardContent } = require("../controllers/board-controller")
const { validation } = require("../middleware/validator-middleware.js")
const router = express.Router()

router.route("/create").post(createBoardValidator(), validation, createBoard)
router.route("/update").patch(updateBoardValidator(), validation, updateBoard)
router.route("/get/:boardId").get(getBoardContentValidator(), validation, getBoardContent)

module.exports = router