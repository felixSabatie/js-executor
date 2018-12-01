
const handleSockets = (http) => {
 const io = require('socket.io')(http, {origins: '*:*'})

  io.on('connection', function(socket) {

    let currentProject = ''
    // TODO store cursor, user name

    socket.on('connectedOnProject', function(projectHash) {
      socket.join(projectHash)
      console.log('Client connected to ' + projectHash)
      currentProject = projectHash
    })

    socket.on('disconnect', function() {
      console.log('Client disconnected')
    })

    socket.on('editedText', function(newText) {
      socket.broadcast.to(currentProject).emit('editedText', newText)
    })

    socket.on('cursorMoved', function(position) {
      socket.broadcast.to(currentProject).emit('cursorMoved', {
        id: socket.id,
        position
      })
    })
  })
}

module.exports = handleSockets
