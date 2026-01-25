/* import {createServer} from 'https'; */
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';
import https from 'https';
import express from 'express'

const app = express();

const server = https.createServer({
  cert: readFileSync('./cert.pem'),
  key: readFileSync('./key.pem')
}, app)

const wss = new WebSocketServer({server});

app.get('/', (req, res) => {
  console.log(`HI HTTPS, ${req.url}`)
  res.send("Hi there")
})

wss.on('connection', (socket) => {
  socket.on('error', console.error)

  socket.on('open', () => {
    socket.on('message', (data) => {
      console.log(data)

      socket.send(data);
    })
  })
})

server.listen(8080, () => {
  console.log("Sever is listenting to port 8080")
})