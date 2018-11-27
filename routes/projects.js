const router = require('express').Router()

const redirectConsoleToFunctions = require('../utils/console-redirector').redirectConsoleToFunctions
const restoreConsoleFunctions = require('../utils/console-redirector').restoreConsoleFunctions

router.post('/', function(req, res) {
  // TODO Create hash and file
})

router.post('/:hash/execute', function (req, res) {
  let logs = ''
  const consoleLog = (message) => {
    logs += message + '\n'
  }

  console.log('Executing...')
  redirectConsoleToFunctions(consoleLog, consoleLog, consoleLog)
  try {
    // let userFunction = Function(req.body.function)
    // userFunction()
    eval(req.body.function)
  } catch(err) {
    console.error(err)
  }
  restoreConsoleFunctions()
  console.log('Done')

  res.send(logs)
})

module.exports = router
