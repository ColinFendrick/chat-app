const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

io.on('connection', socket => {
  socket.emit('message', 'Welcome!')
  socket.broadcast.emit('message', 'A new user has joined')
  socket.on('sendMessage', message => {
    io.emit('message', message)
  })

  socket.on('sendLocation', ({ latitude, longitude }) => {
    socket.broadcast.emit('message', `Location: ${latitude}, ${longitude}`)
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left')
  })
})

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server is listening on port ${port}.`)
})
