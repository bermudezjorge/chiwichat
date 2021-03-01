const socket = io()

const form = document.getElementById('form')
const nickname = document.getElementById('nickname')
const msg = document.getElementById('msg')

const appendMessage = (data, isMsg) => {
  let item = document.createElement('li')

  if(isMsg) {
    if(socket.id === data.id) {
      item.classList.add('mymessages')
    }
  }
  console.log(data);
  if(isMsg) {
    if(data.nickname) {
      item.textContent = `${data.nickname}: ${data.msg}`
    } else {
      item.textContent = `${data.id}: ${data.msg}`
    }
  } else {
    item.textContent = data
  }


  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  let msgValue = msg.value

  if (msgValue) {
    socket.emit('chat:message', msgValue)

    msg.value = ''
  }

})

nickname.addEventListener('keydown', () => {
  socket.emit('change:nickname', nickname.value)
})

socket.on('user:connection', function(msg) {
  console.log(msg)
  appendMessage(msg, false)
})

socket.on('chat:message', function(data) {
  console.log(data)
  appendMessage(data, true)
})