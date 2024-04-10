const express = require("express")
const { createRoomValidator, joineRoomValidator } = require("../validators/room-validator")
const { validation } = require("../middleware/validator-middleware.js")
const { createRoom, joinRoom, getRoomsWithUser } = require("../controllers/room-controller.js")
const router = express.Router()

router.route("/create").post(createRoomValidator(), validation, createRoom)
router.route("/join").post(joineRoomValidator(), validation, joinRoom)
router.route("/get").get(getRoomsWithUser)

module.exports = router