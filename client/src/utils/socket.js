import { io } from "socket.io-client"

const initSocket = () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io("http://localhost:5000", options)
}

export { initSocket }