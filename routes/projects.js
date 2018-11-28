const router = require('express').Router()
const fs = require('fs')
const crypto = require('crypto')

const redirectConsoleToFunctions = require('../utils/console-redirector').redirectConsoleToFunctions
const restoreConsoleFunctions = require('../utils/console-redirector').restoreConsoleFunctions

router.post('/', function(req, res) {
  const hash = crypto.randomBytes(20).toString('hex')

  const baseData = "function hello() {\nconsole.log('Hello world!');\n}\n\nhello();"

  writeDataToFile(hash, baseData).then(() => {
    console.log(`New project file created : ${hash}.js`)
    res.send(hash)
  }).catch(err => {
    res.status(500)
    res.send('error')
  })
})

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

router.put('/:hash', function(req, res) {
  writeDataToFile(req.params.hash, req.body.code).then(() => {
    res.send('success')
  }).catch(err => {
    res.status(500)
    res.send('error')
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

  executeFile(req.params.hash).then(() => {
    restoreConsoleFunctions()
    console.log('Done')
    res.send(logs)
  }).catch(err => {
    if(err.code === 'ENOENT') {
      res.status(404)
      res.send('not found')
    } else {
      res.status(500)
      res.send('error')
    }
  })
})

const executeFile = function(hash) {
  return new Promise((resolve, reject) => {
    const filepath = getFilePath(hash)

    fs.readFile(filepath, 'utf8', function(error, data) {
      if(error) {
        reject(error)
      } else {
        try {
          eval(data)
        } catch(err) {
          console.error(err.toString())
        } finally {
          resolve()
        }
      }
    })
  })
}

const writeDataToFile = function(hash, data) {
  const filepath = getFilePath(hash)

  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, data, 'utf8', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const getFilePath = function(hash) {
  return `${__basedir}/projects/${hash}.js`
}

module.exports = router
