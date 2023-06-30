const buttonIds = ['option0', 'option1', 'option2', 'option3']
const NameScreen = 'name-entry'
const Lobby = 'lobby'
const OptionSelect = 'option-select'
const ScoreDisplay = 'score-display'

const screens = {
    nickname: document.getElementById(NameScreen),
    lobby: document.getElementById(Lobby),
    options: document.getElementById(OptionSelect),
    score: document.getElementById(ScoreDisplay)
}

function changeScreen(screenName) {
    switch (screenName) {
        case NameScreen:
            screens.nickname.removeAttribute('hidden')
            screens.lobby.setAttribute('hidden', 'hidden')
            screens.options.setAttribute('hidden', 'hidden')
            screens.score.setAttribute('hidden', 'hidden')
            break
        case Lobby:
            screens.nickname.setAttribute('hidden', 'hidden')
            screens.lobby.removeAttribute('hidden')
            screens.options.setAttribute('hidden', 'hidden')
            screens.score.setAttribute('hidden', 'hidden')
            break
        case OptionSelect:
            screens.nickname.setAttribute('hidden', 'hidden')
            screens.lobby.setAttribute('hidden', 'hidden')
            screens.options.removeAttribute('hidden')
            screens.score.setAttribute('hidden', 'hidden')
            break
        case ScoreDisplay:
            screens.nickname.setAttribute('hidden', 'hidden')
            screens.lobby.setAttribute('hidden', 'hidden')
            screens.options.setAttribute('hidden', 'hidden')
            screens.score.removeAttribute('hidden')
            break
    }
}

const socket = io()

const nameInp = document.getElementById('nicknameInp')
document.getElementById('nicknameSubmit').addEventListener('click', (event) => {
    if (nameInp.value.trim()) {
        nameInp.setAttribute('readonly', 'readonly')
        event.target.setAttribute('hidden', 'hidden')

        socket.emit('nickname', nameInp.value.trim())

        document.getElementById('nickname-display').innerText = `Nickname: ${nameInp.value.trim()}`
    }
})


function buildBtnSelect(i) { return () => { socket.emit('input option', i) } }

for (i = 0; i < buttonIds.length; i++)
    document.getElementById(buttonIds[i]).addEventListener('click', buildBtnSelect(i))

socket.on('game state', (state) => {
    switch (state) {
        case 'start':
            changeScreen(Lobby)
            break
        case 'answers':
            changeScreen(OptionSelect)
            break
        case 'correct answer':
        case 'scoreboard':
            changeScreen(ScoreDisplay)
        default:
            console.log(`Recieved game state '${state}' but don't know how to handle`)    
    }
})