const router = require('express').Router()
const fs = require('fs')
const crypto = require('crypto')

const redirectConsoleToFunctions = require('../utils/console-redirector').redirectConsoleToFunctions
const restoreConsoleFunctions = require('../utils/console-redirector').restoreConsoleFunctions

router.get('/:hash', function(req, res) {
  const filepath = `${__basedir}/projects/${req.params.hash}.js`;

  fs.readFile(filepath, 'utf8', function(error, data) {
    if(error) {
      if(error.code === 'ENOENT') {
        res.status(404)
        res.send('not found')
      } else {
        res.status(500)
        res.send('error')
      }
    } else {
      res.send(data)
    }
  })
})

router.post('/', function(req, res) {
  const hash = crypto.randomBytes(20).toString('hex')

  const filepath = `${__basedir}/projects/${hash}.js`;
  const baseData = "function hello() {\nconsole.log('Hello world!');\n}\n\nhello();"

  fs.writeFile(filepath, baseData, 'utf8', (err) => {
    if (err) throw err;

    console.log(`New project file created : ${hash}.js`)

    res.send(hash)
  })
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
