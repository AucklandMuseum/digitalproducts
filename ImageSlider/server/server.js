const path = require('path')
const express = require('express')
const cors = require('cors')

const server = express()

server.use(cors())
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
server.use(express.json())
server.use(express.static(path.join(__dirname, '../public')))

module.exports = server
