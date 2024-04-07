const express = require("express")
const { createChatValidator, getChatValidator } = require("../validators/chat-validator.js")
const { createChat, getChats } = require("../controllers/chat-controller.js")
const { validation } = require("../middleware/validator-middleware.js")
const router = express.Router()

router.route("/create").post(createChatValidator(), validation, createChat)
router.route("/get/:roomId").get(getChatValidator(), validation, getChats)


module.exports = router