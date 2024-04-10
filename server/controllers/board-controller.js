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

const updateBoard = async (req, res) => {
    const { content, boardId } = req.body
    try {
        // check whether board exists
        const boardFound = await Board.findById(boardId)
        // exists then return error
        if (!boardFound) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 404,
                    message: "Board does not exists"
                }
            })
        }
        // create the board
        const boardUpdated = await Board.findByIdAndUpdate(boardId, { content }, { new: true })
        if (!boardUpdated) {
            return res.status(500).json({
                success: false,
                data: {
                    statusCode: 500,
                    message: "Failed to update the board"
                }
            })
        }
        // return the board
        return res.status(200).json({
            success: true,
            data: {
                statusCode: 200,
                data: boardUpdated
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

const getBoardContent = async (req, res) => {
    const { roomId } = req.params
    try {
        const boardFound = await Board.findOne({ roomId })
        if (!boardFound) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 404,
                    message: "Board content not found"
                }
            })
        }
        return res.status(200).json({
            success: true,
            data: {
                statusCode: 200,
                value: boardFound
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 500,
                message: error || "Internal server error"
            }
        })
    }
}

module.exports = { createBoard, updateBoard, getBoardContent }