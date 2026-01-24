import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();

const port: number = 8080;

const wss = new WebSocketServer({port: 8080})

app.get("/", (req, res) => {
  console.log(`request url: ${req.url}, with status code: ${req.statusCode}`)
  res.send("Hi there")
})

wss.on('connection', (socket) => {
  socket.on('error', () => {
    console.error
  });

  socket.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      client.send(data, {
        binary: isBinary
      })
    })
  });

  socket.on('message', (data, isBinary) => {
    socket.send(data, {
      binary: isBinary
    })
  });

  socket.send("You got a conection established with the websockter server");
})

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
});