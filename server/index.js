const express = require("express");

const app = express();
const router = require("./routes/auth-router");
const roomRouter = require("./routes/room-routes")
const codeRouter = require("./routes/code-routes.js")
const boardRouter = require('./routes/board-routes.js')

app.use(express.json());

// middleware for the routes -- all routes present in routes folder
app.use("/api/auth", router);
app.use("/api/room", roomRouter)
app.use("/api/code", codeRouter)
app.use("/api/board", boardRouter)

const connectDB = require("./utils/db");

const PORT = 5000;

// if DB connected then only start the server

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
