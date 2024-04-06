const { Schema, model } = require("mongoose")

const boardSchema = new Schema({
    content: {
        type: String,
        default: null
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    }
},
    {
        timestamps: true
    }
)

const Board = model("Board", boardSchema)

module.exports = Board