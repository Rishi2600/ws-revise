/* import {createServer} from 'https'; */
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';
import https from 'https';

const server = https.createServer({
  cert: readFileSync('./cert.pem'),
  key: readFileSync('./key.pem')
},(req, res) => {
  console.log(`Server connection established with https at ${req.url}, and the response status code is: ${res.statusCode}`)
  res.end("Hi there")
})

const wss = new WebSocketServer({server});

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