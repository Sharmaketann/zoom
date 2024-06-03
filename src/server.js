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

function handleConnection(socket) {
  console.log(socket)
}

wss.on("connection", handleConnection)

server.listen(3000, handleListen)
