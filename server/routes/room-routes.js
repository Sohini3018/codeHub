const express = require("express")
const { createRoomValidator } = require("../validators/room-validator")
const { validation } = require("../middleware/validator-middleware.js")
const { createRoom } = require("../controllers/room-controller.js")
const router = express.Router()

router.route("/create").post(createRoomValidator(), validation, createRoom)

module.exports = router