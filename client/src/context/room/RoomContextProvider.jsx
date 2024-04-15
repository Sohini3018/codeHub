import React, { useEffect, useState, useRef } from 'react'
import { RoomContext } from './RoomContext'

function RoomContextProvider({ children }) {

    const [editorData, setEditorData] = useState({
        _id: "",
        html: "",
        css: "",
        js: ""
    })
    const boardData = useRef({
        _id: "",
        content: []
    })
    const [chatsData, setChatsData] = useState([])
    const [roomData, setRoomData] = useState(null)
    const [mode, setMode] = useState("editor")
    const socketRef = useRef(null)

    function clearRoomStuff() {
        setRoomData(null)
        setChatsData([])
        setEditorData({
            _id: "",
            html: "",
            css: "",
            js: ""
        })
        boardData.current = {
            _id: "",
            content: ""
        }
        setMode("editor")
    }

    return (
        <RoomContext.Provider value={{ editorData, boardData, chatsData, setEditorData, setChatsData, roomData, setRoomData, mode, setMode, clearRoomStuff, socketRef }}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider