const express = require('express')
const app = express()
exports.app = app

const http = require('http')
const server = http.createServer(app)
exports.server = server

const { Server } = require('socket.io')
const io = new Server(server)

io.on('connection', function(socket) {
    var nickname = 'UNKNOWN'
    socket.on('nickname', function(n) {
        nickname = n
    })

    socket.on('input option', function(val) {
        console.log(`${nickname} selected ${val}`)
    })
})

function Test() {
    io.emit('test')
}
exports.Test = Test