import { WebSocketServer } from "ws";
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

  socket.on('message', (data, isBinary) => {
    console.log(`message from the client is ${data}`)
    socket.send(data, {
      binary: isBinary
    })
  })

  socket.send("This message is to confirm the connection is estableished with the wss")
})

app.listen(port, () => {
  console.log('Server is listening on port: ' + port)
})