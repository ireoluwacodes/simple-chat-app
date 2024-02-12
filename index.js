const express = require("express");
const path = require("path");
const { PORT } = require("./config/constants");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () =>
  console.log(`server is listening on port ${PORT}`)
);

const io = require("socket.io")(server);

let socketsConnected = new Set();

const onConnected = (socket) => {
  console.log(socket.id);
  socketsConnected.add(socket.id);

  io.emit("connected-clients", socketsConnected.size);

  socket.on("disconnect", () => {
    console.log(`Socket with id ${socket.id} disconnected`);
    socketsConnected.delete(socket.id);

    io.emit("connected-clients", socketsConnected.size);
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("chats", data);
  });

  socket.on("feedback", (data)=>{
    socket.broadcast.emit("feedback", data)
  })
};

io.on("connection", onConnected);
