const { Schema, Types, model } = require("mongoose")
const { AvailableSenderType, senderType } = require("../constants.js")

const chatSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    senderType: {
        type: String,
        enum: AvailableSenderType,
        default: senderType.USER,
        required: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    }

}, { timestamps: true })

const Chat = model("Chat", chatSchema)

module.exports = Chat