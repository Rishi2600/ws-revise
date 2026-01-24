import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();

const port: number = 8000;


app.get("/", (req, res) => {
  console.log(`request url: ${req.url}, with status code: ${res.statusCode}`)
  res.send("Hi there")
})

const server = app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
});

const wss = new WebSocketServer({server})

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
