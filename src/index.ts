import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();

const wss = new WebSocketServer({port: 8080})

app.get("/", (req, res) => {
  console.log(`request url: ${req.url}, with status code: ${res.statusCode}`)
  res.send("Hi there")
})


wss.on('connection', (socket) => {
  socket.on('error', () => {
    console.error
  });

  socket.on('open', () => {
    socket.on('message', (data) => {
      console.log(data);
    })

    socket.send("connection established")
  })

})

app.listen(8000, () => {
  console.log(`Server is listening on port: ${8000}`)
});