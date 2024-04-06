const { Schema, model } = require("mongoose")

const CodeSchema = new Schema({
    html: {
        type: String,
        required: true,
        trim: true
    },
    css: {
        type: String,
        required: true,
        trim: true
    },
    js: {
        type: String,
        required: true,
        trim: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    }
}, { timestamps: true })

const Code = model("Code", CodeSchema)

module.exports = Code