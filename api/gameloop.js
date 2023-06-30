const QuestionDuration = 2000
const AnswerDuration = 10000
const CorrectDuration = 5000
const ScoreboardDuration = 5000

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const { io } = require('./socket')


const Game = {
    questions: [],
    players: [],
    question: 0,
    state: 'lobby',
    playing: false
}
function SetQuestionList(list) {
    Game.questions = list
}
exports.SetQuestionList = SetQuestionList

function AddNewPlayer(name) {
    Game.players.push({
        name: name,
        score: 0
    })
    io.emit('add player', name)
}
exports.AddNewPlayer = AddNewPlayer

function InitNewGame() {
    Game.state = 'lobby'
    Game.players = []
    Game.question = 0
}
exports.InitNewGame = InitNewGame

function StartGame() {
    GameLoop()
    Game.playing = true
}
exports.StartGame = StartGame

function StopGame() {
    Game.playing = false
}
exports.StopGame = StopGame

async function GameLoop() {
    while (Game.question < Game.questions.length && Game.playing) {
        io.emit('game state', 'new question')
        io.emit('question', Game.questions[Game.question])

        await sleep(QuestionDuration)

        io.emit('game state', 'answers')

        await sleep(AnswerDuration)

        io.emit('game state', 'correct answer')

        await sleep(CorrectDuration)

        io.emit('game state', 'scoreboard')

        await sleep(ScoreboardDuration)

        Game.question++
    }
    
    io.emit('game state', 'stop')
}