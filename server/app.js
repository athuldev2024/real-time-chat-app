import express from "express";
import http from "http";
import cors from "cors";
import routes from "./src/routes";
import bodyParser from "body-parser";
import socketio from "socket.io";
import "dotenv/config";
import db from "@models";

const app = express();
const server = http.createServer(app);
const PORT = process.env.API_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("src/public"));

app.use("/", routes);

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Sync success");
  })
  .catch((error) => {
    console.error("Sync failure ", error);
  });

server.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});

// Socket.IO
const io = socketio(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("join_room", (room) => {
    console.log(`${socket.id} joined this room ${room}`);
    socket.join(room);
  });

  socket.on("sendMessage", ({ room, data }) => {
    socket.to(room).emit("message_received", data);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
