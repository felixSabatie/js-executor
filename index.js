const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const redirectConsoleToFunctions = require('./console-redirector').redirectConsoleToFunctions
const restoreConsoleFunctions = require('./console-redirector').restoreConsoleFunctions

app.post('/', function (req, res) {
  let logs = ''
  const consoleLog = (message) => {
    logs += message + '\n'
  }

  console.log('Executing...')
  redirectConsoleToFunctions(consoleLog, consoleLog, consoleLog)
  try {
    let userFunction = Function(req.body.function)
    userFunction()
  } catch(err) {
    console.error(err)
  }
  restoreConsoleFunctions()
  console.log('Done')

  res.send(logs)
})

app.listen(3000)
