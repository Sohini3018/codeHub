const { Types } = require("mongoose")
const Code = require("../models/code-model")

const createCode = async (req, res) => {
    const { html, css, js, roomId } = req.body
    if (!Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({
            success: false,
            data: {
                statusCode: 400,
                message: "please provide correct roomId"
            }
        })
    }
    try {
        const codeFound = await Code.findOne({ roomId })
        if (codeFound) {
            return res.status(400).json({
                success: false,
                data: {
                    statusCode: 400,
                    message: "Code with this roomId already exists"
                }
            })
        }
        const codeCreated = await Code.create({ html, css, js, roomId })
        const codeCreatedFound = await Code.findById(codeCreated._id)
        if (!codeCreatedFound) {
            return res.status(500).json({
                success: false,
                data: {
                    statusCode: 500,
                    message: "Failed to create code"
                }
            })
        }
        return res.status(201).json({
            success: true,
            data: {
                statusCode: 201,
                message: "Code created successfully",
                value: codeCreatedFound
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

const updateCode = async (req, res) => {
    const { html, css, js, codeId } = req.body
    if (!Types.ObjectId.isValid(codeId)) {
        return res.status(400).json({
            success: false,
            data: {
                statusCode: 400,
                message: "please provide correct codeId"
            }
        })
    }
    try {
        const codeFound = await Code.findById(codeId)
        if (!codeFound) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 404,
                    message: "Code with this codeId does not exists"
                }
            })
        }
        const updatedCode = await Code.findByIdAndUpdate(codeId, { html, css, js }, { new: true })
        return res.status(200).json({
            success: true,
            data: {
                statusCode: 200,
                value: updatedCode
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            data: {
                statusCode: 500,
                message: error || "Internal server error"
            }
        })
    }

}

const getCode = async (req, res) => {
    const { roomId } = req.params
    try {
        // find the code with the roomId
        const code = await Code.findOne({ roomId })
        // not found reply with error
        if (!code) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 404,
                    message: "Code does not exist for the provided roomId"
                }

            })
        }
        // found return the value
        return res.status(200).json({
            success: true,
            data: {
                statusCode: 200,
                value: code
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

module.exports = { createCode, updateCode, getCode }