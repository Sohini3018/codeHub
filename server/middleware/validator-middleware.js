const { validationResult } = require("express-validator")

const validation = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const errorsExtracted = []
    errors.array().map((error) => errorsExtracted.push({ [error.path]: error.msg }))
    return res.status(422).json({
        status: "failure",
        data: {
            statusCode: 422,
            value: errorsExtracted
        }
    })
}

module.exports = { validation }