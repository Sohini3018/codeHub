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
                message: error || "Internal server error"
            }
        })
    }
}

const joinRoom = async (req, res) => {
    const { name, password, username } = req.body
    try {
        const roomFound = await Room.findOne({ name })
        if (!roomFound) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 404,
                    message: "Room does not exist with the provided name"
                }
            })
        }
        const isPasswordCorrect = await roomFound.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                data: {
                    statusCode: 401,
                    message: "Please enter correct credentials"
                }
            })
        }
        const userGotInRoom = await Room.findOne({
            name,
            users: {
                $elemMatch: {
                    $eq: username
                }
            }
        })
        if (userGotInRoom) {
            return res.status(400).json({
                success: false,
                data: {
                    statusCode: 400,
                    message: "user has already joined the room"
                }
            })
        }
        const roomUpdated = await Room.updateOne({ name }, { $push: { users: username } })
        if (!roomUpdated) {
            return res.status(500).json({
                success: false,
                data: {
                    statusCode: 500,
                    message: "Failed to join user"
                }
            })
        }
        const roomSend = await Room.findOne({ name }).select("-password")
        return res.status(200).json({
            success: true,
            data: {
                statusCode: 200,
                value: roomSend
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

const getRoomsWithUser = async (req, res) => {
    const { username } = req.query
    if (!username) {
        return res.status(400).json({
            success: false,
            data: {
                statusCode: 400,
                message: "please provode username"
            }
        })
    }
    try {
        const roomsFound = await Room.find({
            users: {
                $elemMatch: {
                    $eq: username
                }
            }
        }).select("-password")
        console.log(roomsFound)
        if (roomsFound.length === 0) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 400,
                    message: "no rooms found"
                }
            })
        }
        return res.status(200).json({
            success: true,
            data: {
                statusCode: 200,
                value: roomsFound
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 200,
                message: error.message || "Internal server error"
            }
        })
    }
}

module.exports = { createRoom, joinRoom, getRoomsWithUser }