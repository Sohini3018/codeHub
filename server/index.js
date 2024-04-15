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

io.on("connection", (socket) => {
  console.log("connected", socket.id)
})



httpServer.listen(PORT, () => console.log(`application is running at: http://localhost:${PORT}`))