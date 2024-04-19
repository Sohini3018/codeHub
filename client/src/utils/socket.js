import { io } from "socket.io-client"

const initSocket = () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(`${import.meta.env.VITE_BACKEND_URL}`, options);
}

export { initSocket }