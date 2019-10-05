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
  console.log('new web socket connection')
  socket.emit('message', 'Welcome!')
  socket.on('sendMessage', message => {
    io.emit('message', message)
  })
})

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server is listening on port ${port}.`)
})
