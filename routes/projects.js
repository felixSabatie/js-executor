const router = require('express').Router()

const redirectConsoleToFunctions = require('../utils/console-redirector').redirectConsoleToFunctions
const restoreConsoleFunctions = require('../utils/console-redirector').restoreConsoleFunctions

router.post('/', function(req, res) {
  // TODO Create hash and file
})

router.post('/:hash/execute', function (req, res) {
  let logs = []
  const consoleLog = (message) => {
    logs.push({
      message: message,
      isError: false,
      isWarning: false
    })
  }
  const consoleError = (message) => {
    logs.push({
      message: message,
      isError: true,
      isWarning: false
    })
  }
  const consoleWarn = (message) => {
    logs.push({
      message: message,
      isError: false,
      isWarning: true
    })
  }

  console.log('Executing...')
  redirectConsoleToFunctions(consoleLog, consoleWarn, consoleError)
  try {
    // let userFunction = Function(req.body.function)
    // userFunction()
    eval(req.body.function)
  } catch(err) {
    console.error(err.toString())
  }
  restoreConsoleFunctions()
  console.log('Done')

  res.send(logs)
})

module.exports = router
