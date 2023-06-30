const Lobby = 'lobby'
const Question = 'question-start'
const Answers = 'question-answers'
const CorrectAnswer = 'answer-display'
const Scoreboard = 'scoreboard'
const EndScreen = 'complete'

const screens = {
    lobby: document.getElementById(Lobby),
    question: document.getElementById(Question),
    answers: document.getElementById(Answers),
    correctAnswer: document.getElementById(CorrectAnswer),
    scoreboard: document.getElementById(Scoreboard),
    endScreen: document.getElementById(EndScreen),
}

function changeScreen(screenName) {
    switch (screenName) {
        case Lobby:
            screens.lobby.removeAttribute('hidden')
            screens.question.setAttribute('hidden', 'hidden')
            screens.answers.setAttribute('hidden', 'hidden')
            screens.correctAnswer.setAttribute('hidden', 'hidden')
            screens.scoreboard.setAttribute('hidden', 'hidden')
            screens.endScreen.setAttribute('hidden', 'hidden')
            break
        case Question:
            screens.lobby.setAttribute('hidden', 'hidden')
            screens.question.removeAttribute('hidden')
            screens.answers.setAttribute('hidden', 'hidden')
            screens.correctAnswer.setAttribute('hidden', 'hidden')
            screens.scoreboard.setAttribute('hidden', 'hidden')
            screens.endScreen.setAttribute('hidden', 'hidden')
            break
        case Answers:
            screens.lobby.setAttribute('hidden', 'hidden')
            screens.question.removeAttribute('hidden')
            screens.answers.removeAttribute('hidden')
            screens.correctAnswer.setAttribute('hidden', 'hidden')
            screens.scoreboard.setAttribute('hidden', 'hidden')
            screens.endScreen.setAttribute('hidden', 'hidden')
            break
        case CorrectAnswer:
            screens.lobby.setAttribute('hidden', 'hidden')
            screens.question.setAttribute('hidden', 'hidden')
            screens.answers.setAttribute('hidden', 'hidden')
            screens.correctAnswer.removeAttribute('hidden')
            screens.scoreboard.setAttribute('hidden', 'hidden')
            screens.endScreen.setAttribute('hidden', 'hidden')
            break
        case Scoreboard:
            screens.lobby.setAttribute('hidden', 'hidden')
            screens.question.setAttribute('hidden', 'hidden')
            screens.answers.setAttribute('hidden', 'hidden')
            screens.correctAnswer.setAttribute('hidden', 'hidden')
            screens.scoreboard.removeAttribute('hidden')
            screens.endScreen.setAttribute('hidden', 'hidden')
            break
        case EndScreen:
            screens.lobby.setAttribute('hidden', 'hidden')
            screens.question.setAttribute('hidden', 'hidden')
            screens.answers.setAttribute('hidden', 'hidden')
            screens.correctAnswer.setAttribute('hidden', 'hidden')
            screens.scoreboard.setAttribute('hidden', 'hidden')
            screens.endScreen.removeAttribute('hidden')
            break
    }
}

const socket = io()

const pList = document.getElementById('player-list')
socket.on('add player', function(name) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(name));
    pList.appendChild(li);
})

document.getElementById('start').addEventListener('click', () => {
     socket.emit('game state', 'start')
})
document.getElementById('stop').addEventListener('click', () => {
     socket.emit('game state', 'stop')
})

socket.on('game state', (state) => { 
    switch(state) {
        case 'start':
            break
        case 'new question':
            changeScreen(Question)
            break
        case 'answers':
            changeScreen(Answers)
            break
        default:
            console.log(`Recieved game state '${state}' but don't know how to handle`)
    }
})

const question = document.getElementById('question-text')
const answer0 = document.getElementById('answer0')
const answer1 = document.getElementById('answer1')
const answer2 = document.getElementById('answer2')
const answer3 = document.getElementById('answer3')
socket.on('question', (q) => {
    console.log(q)
    console.log(answer0)
    console.log(answer0.innerText)
    question.innerText = q.q
    answer0.innerText = q.a0
    answer1.innerText = q.a1
    answer2.innerText = q.a2
    answer3.innerText = q.a3
 })