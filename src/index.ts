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
    socket.send('connection established')
  })

  socket.on('message', (data) => {
    console.log(`${data} is the text data received`)
  })
})
