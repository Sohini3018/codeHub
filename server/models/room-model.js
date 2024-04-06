const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    users: {
        type: Array
    },
    admin: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

RoomSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

RoomSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const Room = model("Room", RoomSchema)

module.exports = { Room }