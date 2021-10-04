const form = document.getElementById('form')

form.addEventListener('submit', someFunction)

function someFunction(e){

    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const userData = {username ,password}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    fetch('http://localhost:3000/register', options)



}