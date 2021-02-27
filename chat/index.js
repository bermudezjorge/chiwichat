module.exports = (io) => {
    
  const connectLog = socket => {

    console.log(`user ${socket.id} connected`)
    io.emit('chat:message', `user ${socket.id} connected`)
  }

  const disconnectLog = function() {
    const socket = this

    console.log(`user ${socket.id} disconnected`)
    io.emit('chat:message', `user ${socket.id} disconnected`)
  }

  const chatEmitter = msg => {
    console.log(`message: ${msg}`)
    io.emit('chat:message', msg)
  }

  return {
    connectLog,
    disconnectLog,
    chatEmitter
  }
}