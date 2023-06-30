const { io } = require('./socket')
const { AddNewPlayer, StartGame, StopGame, InitNewGame } = require('./gameloop')




io.on('connection', function(socket) {
    var nickname = 'UNKNOWN'
    socket.on('nickname', function(n) {
        nickname = n
        AddNewPlayer(nickname)
    })

    socket.on('input option', function(val) {
        console.log(`${nickname} selected ${val}`)
    })


    socket.on('game state', function(state) {
        switch(state) {
            case 'start':
                io.emit('game state', 'start')
                InitNewGame()
                StartGame()
                break
            case 'stop':
                StopGame()
                break
            default:
                console.log(`Recieved game state '${state}' but don't know how to handle`)
        }
    })
})
