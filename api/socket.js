const express = require('express')
const app = express()
exports.app = app

const http = require('http')
const server = http.createServer(app)
exports.server = server
