const messageList = document.querySelector("ul")
const messageForm = document.querySelector("form")
const socket = new WebSocket(`ws://${window.location.host}`)

function handleOpen() {
  console.log("Connected to Server ✅")
}

socket.addEventListener("open", handleOpen)

socket.addEventListener("message", (message) => {
  if (message.data instanceof Blob) {
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target.result
      console.log("New message: ", text)

      // Optionally, add the message to the message list
      const li = document.createElement("li")
      li.innerText = text
      messageList.appendChild(li)
    }
    reader.readAsText(message.data)
  } else {
    console.log("New message: ", message.data)

    // Optionally, add the message to the message list
    const li = document.createElement("li")
    li.innerText = message.data
    messageList.appendChild(li)
  }
})

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌")
})

function handleSubmit(event) {
  event.preventDefault()
  const input = messageForm.querySelector("input")
  socket.send(input.value)
  input.value = ""
}

messageForm.addEventListener("submit", handleSubmit)
