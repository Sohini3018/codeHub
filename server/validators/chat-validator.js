const { body, param } = require("express-validator")
const { AvailableSenderType } = require("../constants.js")
const { Types } = require("mongoose")

const createChatValidator = () => {
    return [
        body("content")
            .trim()
            .notEmpty()
            .withMessage("please enter some content"),
        body("senderType")
            .isIn(AvailableSenderType)
            .withMessage("Invalid sender type"),
        body("roomId")
            .exists()
            .withMessage("please provide roomId field")
            .trim()
            .custom((value) => Types.ObjectId.isValid(value))
            .withMessage('please provide a valid roomId'),
    ]
}

const getChatValidator = () => {
    return [
        param("roomId")
            .exists()
            .withMessage("please provide roomId field")
            .trim()
            .custom((value) => Types.ObjectId.isValid(value))
            .withMessage('please provide a valid roomId')
    ]
}

module.exports = { createChatValidator, getChatValidator }