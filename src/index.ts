import WebSocket, { WebSocketServer } from "ws";
import express from 'express';

const app = express();

const port = 8080;

app.get('/', (req: any, res: any) => {
  console.log(`Received ${req.method} request from the ${req.url} route`)
  res.send("Hi there")
})

const wss = new WebSocketServer({port: 8080})

wss.on('connection', (socket) => {
  socket.on('error', console.error)

  //for broadcasting - first, we check where the handler is (here, it is at the message), and then we iterate to all the clients, followed by forwarding them the message.
  socket.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, {
          binary: isBinary
        })
      }
    })
  })

  socket.send("This message is to confirm the connection is estableished with the wss")
})

app.listen(port, () => {
  console.log('Server is listening on port: ' + port)
})