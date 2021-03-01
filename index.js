const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const music = require('./routes/index.js')

const {connectLog, disconnectLog, chatEmitter, changeNickname} = require('./chat')(io)

app.use(express.static('public'))

app.use('/music', music)

const onConnection = socket => {
  connectLog(socket)  

  socket.on("disconnect", disconnectLog)
  socket.on("chat:message", chatEmitter)
  socket.on("change:nickname", changeNickname)
}

io.on('connection', onConnection)

http.listen(3000, () => {
  console.log('listening on localhost:3000')
})