import { WebSocketServer } from "ws";
import http from 'http';

const server = http.createServer();

const wss1 = new WebSocketServer({noServer: true});
const wss2 = new WebSocketServer({noServer: true});

wss1.on('connection', (ws) => {
  ws.on('error', console.error)
})

wss2.on('connection', (ws) => {
  ws.on('error', console.error)
})

server.on('upgrade', (req: any, socket: any, head: any) => {
  const {pathname} = new URL(req.url, 'wss://base.url')

  if (pathname === '/1') {
    wss1.handleUpgrade(req, socket, head, (ws: any) => {
      wss1.emit('connection from 1', ws, req)
    })
  } else if (pathname === '/2') {
    wss2.handleUpgrade(req, socket, head, (ws: any) => {
      wss2.emit('connection from 2', ws. req)
    })
  } else {
    socket.destroy()
  }
})

server.listen(8080)