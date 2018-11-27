const express = require('express')
const app = express()
const router = require('./routes')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/api', router)

app.listen(3000)
