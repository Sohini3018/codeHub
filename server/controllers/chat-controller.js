const Chat = require("../models/chat-model.js")

const createChat = async (req, res) => {
    const { content, senderType, roomId } = req.body
    try {
        const chatCreate = await Chat.create({ content, senderType, roomId })
        const chatGot = await Chat.findById(chatCreate._id)
        if (!chatGot) {
            return res.status(500).json({
                success: false,
                data: {
                    statusCode: 500,
                    message: "Failed to create chat"
                }
            });
        }
        return res.status(201).json({
            success: true,
            data: {
                statusCode: 201,
                value: chatGot
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 500,
                message: error || "Internal server error"
            }
        })
    }
}

const getChats = async (req, res) => {
    const { roomId } = req.params
    try {
        const chats = await Chat.find({ roomId })
        if (chats.length === 0) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 404,
                    message: "chats not found"
                }
            })
        }
        return res.status(200).json({
            success: true,
            data: {
                statusCode: 200,
                value: chats
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

module.exports = { createChat, getChats }