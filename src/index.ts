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

  socket.on('open', () => {
    const array = new Float32Array(5);

    for (let i=0; i<array.length; i++) {
      array[i] = i/2;
    }

    socket.send(array);
  })
})
