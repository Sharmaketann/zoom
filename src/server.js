import express from "express"
import http from "http"
import WebSocket from "ws"

const app = express()

console.log("HERLLLO")

app.set("view engine", "pug")

app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"))

const handleListen = () => console.log(`Listening on XXXXXXXXXXXXXXXXXXXXX`)

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

wss.on("connection", (socket) => {
  console.log("Connected to Browser")
  socket.on("close", () => console.log("Disconnected from Browser"))
  socket.send("hello")
})

server.listen(3000, handleListen)
