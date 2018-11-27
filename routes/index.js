const router = require('express').Router()
const projects = require('./projects')

router.use('/projects', projects)

module.exports = router
