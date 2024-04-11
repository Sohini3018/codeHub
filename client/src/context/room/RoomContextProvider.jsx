import React, { useEffect, useState } from 'react'
import { RoomContext } from './RoomContext'

function RoomContextProvider({ children }) {

    const [editorData, setEditorData] = useState({
        html: "",
        css: "",
        js: ""
    })
    const [boardData, setBoardData] = useState(null)
    const [chatsData, setChatsData] = useState(null)
    const [roomData, setRoomData] = useState(null)
    const [boardId, setBoardId] = useState(null)
    const [codeId, setCodeId] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [codeResonse, boardResponse, chatResponse] = await Promise.all([
                    fetch('http://localhost:5000/api/code/get/6616565e86b024f7dbdaec0a'),
                    fetch('http://localhost:5000/api/board/get/6616565e86b024f7dbdaec0a'),
                    fetch('http://localhost:5000/api/chat/get/6616565e86b024f7dbdaec0a'),
                ]);

                const codeReceived = await codeResonse.json();
                const boardReceived = await boardResponse.json();
                const chatReceived = await chatResponse.json();

                if (codeReceived.data.statusCode === 200) {
                    setEditorData(codeReceived.data.value)
                }
                if (boardReceived.data.statusCode === 200) {
                    setBoardData(boardReceived.data.value)
                }
                if (chatReceived.data.statusCode === 200) {
                    setChatsData(chatReceived.data.value)
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <RoomContext.Provider value={{ editorData, boardData, chatsData, setEditorData, setBoardData, setChatsData, roomData, setRoomData, setBoardId, setCodeId }}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider