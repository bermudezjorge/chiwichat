module.exports = (io) => {

  let nicknames = {}
    
  const connectLog = socket => {

    console.log(`user ${socket.id} connected`)
    io.emit('user:connection', `user ${socket.id} connected`)
  }

  const disconnectLog = function() {
    const socket = this

    console.log(`user ${socket.id} disconnected`)
    io.emit('user:connection', `user ${socket.id} disconnected`)
  }

  const chatEmitter = function(msg) {
    const socket = this

    if(nicknames[socket.id]) {
      console.log(`user ${nicknames[socket.id]} message: ${msg}`)
      io.emit('chat:message', {
        id: socket.id,
        nickname: nicknames[socket.id],
        msg
      })
    } else {
      console.log(`user ${socket.id} message: ${msg}`)
      io.emit('chat:message', {
        id: socket.id,
        msg
      })
    }
  }

  const changeNickname = function(nickname) {
    const socket = this

    nicknames[socket.id] = nickname
  }

  return {
    connectLog,
    disconnectLog,
    chatEmitter,
    changeNickname
  }
}