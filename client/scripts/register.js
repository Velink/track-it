const form = document.getElementById('form')

form.addEventListener('submit', userDataSubmission)

function userDataSubmission(e) {

    e.preventDefault()
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userData = { username, email, password }
    console.log(userData);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    fetch('http://localhost:3000/register', options)

    location.assign('../html/addHabits.html')

}