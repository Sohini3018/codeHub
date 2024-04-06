const Board = require("../models/board-model")

const createBoard = async (req, res) => {
    const { content, roomId } = req.body
    try {
        // check whether board exists
        const boardFound = await Board.findOne({ roomId })
        // exists then return error
        if (boardFound) {
            return res.status(400).json({
                success: false,
                data: {
                    statusCode: 400,
                    message: "Board already exists"
                }
            })
        }
        // create the board
        const boardCreated = await Board.create({ content, roomId })
        const boardCreatedFound = await Board.findById(boardCreated._id)
        if (!boardCreatedFound) {
            return res.status(500).json({
                success: false,
                data: {
                    statusCode: 500,
                    message: "Failed to create the board"
                }
            })
        }
        // return the board
        return res.status(201).json({
            success: true,
            data: {
                statusCode: 201,
                data: boardCreatedFound
            }
        })
    } catch (error) {
        // catch and return error
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 500,
                message: error || "Internal server error"
            }
        })
    }
}

module.exports = { createBoard }