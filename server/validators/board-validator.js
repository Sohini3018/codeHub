const { body, param } = require("express-validator")
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
const updateBoardValidator = () => {
    return [
        body("content")
            .exists()
            .withMessage("please provide content field")
            .trim(),
        body("boardId")
            .exists()
            .withMessage("please provide boardId field")
            .trim()
            .custom((value) => Types.ObjectId.isValid(value))
            .withMessage('please provide a valid boardId'),
    ]
}
const getBoardContentValidator = () => {
    return [
        param("boardId")
            .exists()
            .withMessage("please provide boardId field")
            .trim()
            .custom((value) => Types.ObjectId.isValid(value))
            .withMessage('please provide a valid boardId'),
    ]
}

module.exports = { createBoardValidator, updateBoardValidator, getBoardContentValidator }