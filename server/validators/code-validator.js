const { body } = require("express-validator")

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

module.exports = { createCodeValidator }