import WebSocket, {WebSocketServer} from "ws";
import http from 'http';

const port: number = 8080;

const server = http.createServer((req: any, res: any) => {
  console.log(`Received a ${req.method} request from the ${req.url}`)
  res.end("Hey there")
})

const wss = new WebSocketServer({server})

wss.on('connection', (socket) => {

  socket.on('error', console.error);

  socket.on('message', (data, isBinary) => {

    const message = data.toString()

    if(message == "ping") {
      socket.send("pong")
    } else {
      socket.send("message ping to get pong", {
        binary: isBinary
      })
    }

  })

  socket.send("this is the message to ensure the connection is established with the wss")
})

server.listen(port, () => {
  console.log('server is listening on port: ' + port)
})