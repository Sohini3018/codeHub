import React, { useDebugValue, useEffect, useState } from 'react'
import Monaco from '../CodeEditor/Monaco'
import { useRoomContext } from '../../context/room/RoomContext'
import { Whiteboard } from '../WhiteBoard/Whiteboard'
import ChatBox from '../Chatbox/ChatBox'
import { useParams } from "react-router-dom"

function Room() {
    const { mode, setBoardData, setEditorData, setChatsData } = useRoomContext()
    const { roomId } = useParams()

    const fetchData = async (roomId) => {
        try {
            const [codeResonse, boardResponse, chatResponse] = await Promise.all([
                fetch(`http://localhost:5000/api/code/get/${roomId}`),
                fetch(`http://localhost:5000/api/board/get/${roomId}`),
                fetch(`http://localhost:5000/api/chat/get/${roomId}`),
            ]);

            const codeReceived = await codeResonse.json();
            const boardReceived = await boardResponse.json();
            const chatReceived = await chatResponse.json();

            if (codeReceived.data.statusCode === 200) {
                let html = codeReceived.data.value.html
                let css = codeReceived.data.value.css
                let js = codeReceived.data.value.js
                let _id = codeReceived.data.value._id
                setEditorData({ html, css, js, _id })
            }
            if (boardReceived.data.statusCode === 200) {
                console.log(boardReceived.data.value)
                let data = boardReceived.data.value.content
                let content
                if (data) {
                    content = JSON.parse(data)
                }
                let _id = boardReceived.data.value._id
                setBoardData({ content, _id })
            }
            if (chatReceived.data.statusCode === 200) {
                setChatsData(chatReceived.data.value)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData(roomId)
    }, [])

    return (
        <div>
            {
                mode === "editor" && <Monaco />
            }
            {
                mode === "board" && <Whiteboard />
            }
            {
                mode === "chat" && <ChatBox />
            }
        </div>
    )
}

export default Room