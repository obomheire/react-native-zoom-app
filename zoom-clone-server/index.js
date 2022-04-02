import  express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app);
import { Server } from 'socket.io'
const io = new Server(server);

const users = []

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
})

const addUser = (userName, roomId) => {
  users.push({
    userName,
    roomId
  })
}

const userLeave = userName => users.filter(user => user.user != userName)

const getRoomUsers = (roomId) => users.filter(user => user.roomId === roomId)

io.on('connection', socket => {
  console.log('Someone is Connected')
  socket.on('join-room', ({ roomId, userName  }) => {
    console.log('User Joined Room')
    console.log(roomId)
    console.log(userName)
    socket.join(roomId)
    addUser(userName, roomId)
    // console.log(users)
    socket.to(roomId).emit('user-connected', userName)

    //emit to all conneceted users
    io.to(roomId).emit('all-users', getRoomUsers(roomId))

    socket.on('disconnect', () => {
      console.log('disconnected')
      socket.leave(roomId)
      userLeave(userName)
      io.to(roomId).emit('all-users', getRoomUsers(roomId))

    })
  })
})



server.listen(3000, () => {
    console.log('Zoom clone API Listen on localhost: 3000')
});