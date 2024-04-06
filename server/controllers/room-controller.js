const { Room } = require("../models/room-model")

const createRoom = async (req, res) => {
    const { name, password, users, admin } = req.body
    try {
        const roomFound = await Room.findOne({ name })
        if (roomFound) {
            return res.status(403).json({
                success: false,
                data: {
                    statusCode: 403,
                    message: "Please enter another room name",
                }
            })
        }
        const roomCreated = await Room.create({ name, users, password, admin })
        const roomCreatedFound = await Room.findById(roomCreated._id).select("-password")
        if (!roomCreatedFound) {
            return res.status(500).json({
                success: false,
                data: {
                    statusCode: 500,
                    message: "Internal Server error",
                }
            })
        }
        return res.status(201).json({
            success: true,
            data: {
                statusCode: 201,
                message: "room created successfully",
                value: roomCreatedFound,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 500,
                message: "Internal server error"
            }
        })
    }
}

module.exports = { createRoom }