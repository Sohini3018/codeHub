import React, { useEffect, useState } from 'react'
import { RoomContext } from './RoomContext'

function RoomContextProvider({ children }) {

    const [editorData, setEditorData] = useState({
        _id: "",
        html: "",
        css: "",
        js: ""
    })
    const [boardData, setBoardData] = useState({
        _id: "",
        content: ""
    })
    const [chatsData, setChatsData] = useState(null)
    const [roomData, setRoomData] = useState(null)
    const [mode, setMode] = useState("editor")

    // useEffect(() => {
    //     const fetchData = async (roomId) => {
    //         try {
    //             const [codeResonse, boardResponse, chatResponse] = await Promise.all([
    //                 fetch(`http://localhost:5000/api/code/get/${roomId}`),
    //                 fetch(`http://localhost:5000/api/board/get/${roomId}`),
    //                 fetch(`http://localhost:5000/api/chat/get/${roomId}`),
    //             ]);

    //             const codeReceived = await codeResonse.json();
    //             const boardReceived = await boardResponse.json();
    //             const chatReceived = await chatResponse.json();

    //             if (codeReceived.data.statusCode === 200) {
    //                 let html = codeReceived.data.value.html
    //                 let css = codeReceived.data.value.css
    //                 let js = codeReceived.data.value.js
    //                 let _id = codeReceived.data.value._id
    //                 setEditorData({ html, css, js, _id })
    //             }
    //             if (boardReceived.data.statusCode === 200) {
    //                 let content = JSON.parse(boardReceived.data.value.content)
    //                 let _id = boardReceived.data.value._id
    //                 setBoardData({ content, _id })
    //             }
    //             if (chatReceived.data.statusCode === 200) {
    //                 setChatsData(chatReceived.data.value)
    //             }

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <RoomContext.Provider value={{ editorData, boardData, chatsData, setEditorData, setBoardData, setChatsData, roomData, setRoomData, mode, setMode }}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider