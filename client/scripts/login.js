let loginBtn = document.getElementById('login-button');

loginBtn.addEventListener('click', (e) => {
    requestLogin(e);
})

window.addEventListener('hashchange', displayFeed);

async function requestLogin(e) {
    try {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;


        const loginData = {
            email: email,
            password: password
        }

        console.log(JSON.stringify(loginData));
        console.log(loginData);

        let options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            },
        }

        const response = await fetch(`http://localhost:3000/login`, options);
        const data = await response.json();
        if (!data.success) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (e) {
        console.log(e);
    }

}


async function login(token) {
    const user = jwt_decode(token);
    console.log(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("userEmail", user.email);
    console.log(localStorage);
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch('http://localhost:3000/user', options);
        const data = await response.json();
        if (data.err) {
            console.warn(data.err);
            logout();
        }
        console.log(data);

        window.addEventListener('hashchange', displayFeed);
        window.location.hash = '#dashboard';

        return data;
    } catch (err) {
        console.warn(err);
    }
}


function displayFeed(data) {
    try {
        let body = document.getElementById('login-body');
        console.log(body);
        body.innerHTML = '';
    } catch (error) {
        console.log(error);
    }

}
