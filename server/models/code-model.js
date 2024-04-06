const { Schema, model } = require("mongoose")

const CodeSchema = new Schema({
    html: {
        type: String,
        trim: true
    },
    css: {
        type: String,
        trim: true
    },
    js: {
        type: String,
        trim: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    }
}, { timestamps: true })

const Code = model("Code", CodeSchema)

module.exports = Code