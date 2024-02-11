const express = require("express");
const path = require("path")
const { PORT } = require("./config/constants");
const app = express();
app.use(express.static(path.join(__dirname, "public")))

const server = app.listen(PORT, () =>
  console.log(`server is listening on port ${PORT}`)
);

const io = require("socket.io")(server)


const onConnected = (socket)=>{
    console.log(socket.id)
}

io.on("connection", onConnected)
