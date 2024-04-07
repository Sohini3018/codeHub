const express = require("express")
const { createChatValidator } = require("../validators/chat-validator.js")
const { createChat } = require("../controllers/chat-controller.js")
const { validation } = require("../middleware/validator-middleware.js")
const router = express.Router()

router.route("/create").post(createChatValidator(), validation, createChat)


module.exports = router