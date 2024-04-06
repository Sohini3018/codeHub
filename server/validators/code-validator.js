const { body, param } = require("express-validator")
const { Types } = require("mongoose")

const createCodeValidator = () => {
    return [
        body("html")
            .exists()
            .withMessage("please provide html field")
            .trim(),
        body("css")
            .exists()
            .withMessage("please provide css field")
            .trim(),
        body("js")
            .exists()
            .withMessage("please provide js field")
            .trim()
    ]
}

const getCodeValidator = () => {
    return [
        param("roomId")
            .exists()
            .withMessage("please provide roomId field")
            .trim()
            .custom((value) => Types.ObjectId.isValid(value))
            .withMessage('please provide a valid roomId'),
    ]
}

module.exports = { createCodeValidator, getCodeValidator }