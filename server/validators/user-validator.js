const { body } = require("express-validator")

function UserRegisterValidator() {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email address"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Please enter a username")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Please enter your password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long"),
    ]
}
function UserLoginValidator() {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email address"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Please enter your password")
    ]
}

module.exports = { UserRegisterValidator, UserLoginValidator }