const port = process.env.PORT || 2282


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