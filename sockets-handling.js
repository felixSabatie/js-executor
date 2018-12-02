let projects = new Map()

const handleSockets = (http) => {
  const io = require('socket.io')(http, {origins: '*:*'})
  const getName = require('./utils/name-generator').getName
  io.on('connection', function (socket) {

    let currentProject = ''
    let userName = ''
    // TODO store cursor, user name

    socket.on('connectedOnProject', function (projectHash) {
      socket.join(projectHash)
      userName = getName()
      console.log('Client ' + userName + ' connected to ' + projectHash)
      currentProject = projectHash
      if (!projects.has(projectHash)) {
        projects.set(projectHash, new Map())
      }

      projects.get(projectHash).set(socket.id, {
        userName: userName,
        cursor: {}
      })

      socket.emit('currentUser', socket.id)
      socket.emit('users', Array.from(projects.get(currentProject)))
    })

    socket.on('disconnect', function () {
      console.log('Client disconnected')
      if (projects.has(currentProject)) {
        projects.get(currentProject).delete(socket.id)
        socket.broadcast.to(currentProject).emit('users',
            Array.from(projects.get(currentProject)))
      }
    })

    socket.on('editedText', function (newText) {
      socket.broadcast.to(currentProject).emit('editedText', newText)
    })

    socket.on('cursorMoved', function (position) {
      if (projects.has(currentProject) && projects.get(currentProject).has(
          socket.id)) {
        projects.get(currentProject).get(socket.id).cursor = position
        socket.broadcast.to(currentProject).emit('users',
            Array.from(projects.get(currentProject)))
      }
    })

    socket.on('newLogs', function (newLogs) {
      socket.broadcast.to(currentProject).emit('newLogs', {
        from: userName,  // TODO put name
        logs: newLogs
      })
    })

    socket.on('saved', function () {
      socket.broadcast.to(currentProject).emit('saved')
    })

    socket.on('messageSent', function (message) {
      socket.broadcast.to(currentProject).emit('messageSent', {
        userName: userName,
        content: message
      })
    })
  })
}

module.exports = handleSockets
