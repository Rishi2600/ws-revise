import WebSocket, {WebSocketServer} from "ws";
import http from 'http';

const port: number = 8080;

const server = http.createServer((req: any, res: any) => {
  console.log(`Received a ${req.method} request from the ${req.url}`)
  res.end("Hey there")
})

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const wss = new WebSocketServer({server})

wss.on('connection', (socket) => {

  //@ts-ignore
  socket.id = getRandomInt(0, 100)

  socket.on('error', console.error);

  socket.on('message', (data, isBinary) => {

    wss.clients.forEach((client) => {
      if(client.readyState === WebSocket.OPEN) {

        console.log('data from the websocket server: ' + data)

        client.send(data, {
          binary: isBinary
        })
      }
    })

  })

  //@ts-ignore
  socket.send("this is the message to ensure the connection is established with the wss, and the uid is: " + socket.id)
})

server.listen(port, () => {
  console.log('server is listening on port: ' + port)
})