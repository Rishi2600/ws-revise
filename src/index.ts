import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';

const app = express();
const port: number = 8080;

const wss = new WebSocketServer({ port });

app.get('/', (req, res) => {
  console.log(`${(new Date())}, recieved a ${req.method} request from ${req.url}`)
  res.json({
    response: "Hey there"
  })
})

wss.on('connection', function connection (socket) {
  socket.on ('error', console.error)

  socket.on('message', function message(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log(data)
      const message = socket.send(data)
      client.send(data)
      }
    })
    
  })

  socket.send("this is from server, you have the connection!!!")

})

app.listen(port, () => {
  console.log(`server is listening to port ${port}`)
})