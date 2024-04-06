const { body } = require("express-validator")
const { Types } = require("mongoose")

const createBoardValidator = () => {
    return [
        body("content")
            .exists()
            .withMessage("please provide content field")
            .trim(),
        body("roomId")
            .exists()
            .withMessage("please provide roomId field")
            .trim()
            .custom((value) => Types.ObjectId.isValid(value))
            .withMessage('please provide a valid roomId'),
    ]
}

module.exports = { createBoardValidator }