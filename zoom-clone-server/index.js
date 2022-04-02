import  express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app);
import { Server } from 'socket.io'
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
})

io.on('connection', socket => {
  console.log('Someone is Connected')
  socket.on('join-room', ({ roomId, userName  }) => {
    console.log('User Joined Room')
    console.log(roomId)
    console.log(userName)
  })
})



server.listen(3000, () => {
    console.log('Zoom clone API Listen on localhost: 3000')
});