const buttonIds = ['option0', 'option1', 'option2', 'option3']

const socket = io()

const nameInp = document.getElementById('nicknameInp')
document.getElementById('nicknameSubmit').addEventListener('click', (event) => {
    if (nameInp.value.trim()) {
        nameInp.setAttribute('readonly', 'readonly')
        event.target.setAttribute('hidden', 'hidden')

        socket.emit('nickname', nameInp.value.trim())
        
        buttonIds.forEach(id => {document.getElementById(id).removeAttribute('hidden')})            
    }
})


function buildBtnSelect(i) { return () => { socket.emit('input option', i) } }

for (i = 0; i < buttonIds.length; i++)
    document.getElementById(buttonIds[i]).addEventListener('click', buildBtnSelect(i))