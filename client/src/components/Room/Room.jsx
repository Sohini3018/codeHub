import React, { useEffect, useState } from 'react'
import Monaco from '../CodeEditor/Monaco'
import { useRoomContext } from '../../context/room/RoomContext'
import { Whiteboard } from '../WhiteBoard/Whiteboard'
import ChatBox from '../Chatbox/ChatBox'

function Room() {
    const { roomData, mode } = useRoomContext()

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