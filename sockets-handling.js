
const handleSockets = (http) => {
 const io = require('socket.io')(http, {origins: '*:*'})

  io.on('connection', function(socket) {
    console.log('connection')
  })
}

module.exports = handleSockets
