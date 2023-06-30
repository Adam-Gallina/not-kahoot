const port = process.env.PORT || 2282

require('./api/game')
const Game = require('./api/gameloop')
Game.SetQuestionList(
    [
        { q:'1+1', a0:'2', a1:'-1', a2:'0', a3:'69', c:0 },
        { q:'what color is the sky', a0:'green', a1:'ur mom', a2:'sky', a3:'blue', c:2 },
        { q:'Is?', a0:'nof', a1:'finkaboutit', a2:'um', a3:'yef', c:3 }
    ]
)
Game.InitNewGame()


const express = require('express')
const exphbs = require('express-handlebars')
const { app, server, Test } = require('./api/socket')

app.engine('handlebars', exphbs.engine({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.json())


app.get('/', function(req, res, next) {
    res.status(200).render('home')
})

app.get('/host', function(req, res, next) {
    res.status(200).render('host')
})

app.get('/play', function(req, res, next) {
    res.status(200).render('client')
})

app.get('/test', function(req, res) {
    Test()
    res.status(200).send('sent')
})


app.get('*', function(req, res) {
    console.log("404 for " + req.url)

    res.status(404).send('Error 404: Could not find requested resource')
})

app.get(function(err, req, res, next) {
    console.log(err)
    res.status(500).send('Something went wrong')
})


server.listen(port, function() {
    console.log('-- Server is listening on port ' + port + '!')
})