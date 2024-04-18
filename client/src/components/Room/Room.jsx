import React, { useEffect } from 'react'
import Monaco from '../CodeEditor/Monaco'
import { useRoomContext } from '../../context/room/RoomContext'
import { Whiteboard } from '../WhiteBoard/Whiteboard'
import ChatBox from '../Chatbox/ChatBox'
import { useNavigate, useParams } from "react-router-dom"
import { initSocket } from '../../utils/socket'
import { Actions } from "../../utils/actions.js"
import { useUserContext } from "../../context/user/UserContext.js"
import { toast } from "react-hot-toast"

function Room() {
    const { mode, boardData, setEditorData, setChatsData, setSocketio, setPermission, roomData, setClients, clients, socketio, permission } = useRoomContext()
    const { roomId } = useParams()
    const { userData } = useUserContext()
    const navigate = useNavigate()


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
                let content = ""
                if (data) {
                    content = JSON.parse(data)
                }
                let _id = boardReceived.data.value._id
                boardData.current = { content, _id }
            }
            if (chatReceived.data.statusCode === 200) {
                setChatsData(chatReceived.data.value)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sendPermission = (username) => {
        if (permission === userData.username) {
            setPermission(username)
            socketio.emit(Actions.PERMISSION_CHANGE, { username })
        }
    }


    useEffect(() => {

        if (clients.length === 0) {
            setClients([userData.username])
        }

        let socketio = initSocket()
        setSocketio(socketio)
        console.log("value", socketio)
        socketio.on('connect_error', (err) => handleErrors(err));
        socketio.on('connect_failed', (err) => handleErrors(err));

        function handleErrors(e) {
            console.log('socket error', e);
            toast.error('Socket connection failed, try again later.');
            navigate('/roomJoin');
        }

        socketio?.emit(Actions.JOIN, { roomId, username: userData.username })
        fetchData(roomId)
        setPermission(roomData?.admin)
        socketio?.on(Actions.JOINED, ({
            clients,
            username,
            socketId
        }) => {
            if (userData.username !== username) {
                toast.success(`${username} joined`)
                // setClients(pre => [...pre, username])
                console.log("clients", clients)
            }
            console.log("got joined request", userData.username)
            setClients(clients)
        })
        socketio.on(Actions.DISCONNECTED, ({ socketId, username }) => {
            console.log("hello", username)
            toast.error(`${username} left`)
        })

        socketio.on(Actions.PERMISSION_CHANGE, ({ username }) => {
            console.log("permission changes", username)
            setPermission(username)
        })

        return () => {
            socketio?.disconnect();
        };
    }, [])

    return (
        <div>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
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
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full h-screen bg-base-200 text-base-content z-50">
                        {/* Sidebar content here */}
                        {

                            clients.length > 0 && clients.map((el) => (
                                <div key={el.socketId} className="avatar placeholder cursor-pointer mb-2 ">
                                    <div className="bg-neutral text-neutral-content rounded-full w-16" onClick={() => sendPermission(el.username)}>
                                        <span className="text-xl">{el.username}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Room