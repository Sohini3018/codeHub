const express = require("express");
const cors = require("cors")
const router = require("./routes/auth-router");
const roomRouter = require("./routes/room-routes")
const codeRouter = require("./routes/code-routes.js")
const boardRouter = require('./routes/board-routes.js')
const chatRouter = require("./routes/chat-routes.js")
const { Server } = require("socket.io")
const { createServer } = require("node:http")
const connectDB = require("./utils/db");
const { Actions } = require("./utils/actions.js");


const PORT = 5000;
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer)

// if DB connected then only start the server
connectDB()

app.use(express.json());
app.use(cors())

// middleware for the routes -- all routes present in routes folder
app.use("/api/auth", router);
app.use("/api/room", roomRouter)
app.use("/api/code", codeRouter)
app.use("/api/board", boardRouter)
app.use("/api/chat", chatRouter)

const userSocketMap = {};
function getAllConnectedClients(roomId) {
  // io.sockets.adapter.rooms.get(roomId) will return Map and here we are converting it to array 
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("connected", socket.id)
  socket.on(Actions.JOIN, ({ roomId, username }) => {
    console.log(roomId, username)
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log({ clients });
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(Actions.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  })
  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(Actions.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
})



httpServer.listen(PORT, () => console.log(`application is running at: http://localhost:${PORT}`))