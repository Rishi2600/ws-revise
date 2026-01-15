import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';

const app = express();
const port: number = 8080;

const wss = new WebSocketServer({ port });

wss.on('connection', function connection (socket) {
  socket.on ('error', console.error)

  socket.on('message', function message(data) {
    console.log(data)
    const message = socket.send(data)
    return message
  })

})

app.listen(port, () => {
  console.log(`server is listening to port ${port}`)
})