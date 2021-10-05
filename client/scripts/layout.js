const body = document.querySelector('body')
// we can make a body element or main, doesnt matter

const publicRoutes = ['#login', '#register'];
const privateRoutes = ['#dashboard'];

window.addEventListener('hashchange', updateContent());
function updateBody(path) {
    body.innerHTML = '';
    if (path) { //check if path defined
        switch (path) {
            case '#login':
                renderLoginForm();
                break;
            case '#register':
                renderRegisterForm();
                break;
            case '#dashboard':
                displayDashboard();
                break;
        }
    } else {
        renderLoginForm();
    }
}


// we will set the ids + classes here so we can style them in css after
function renderLoginForm() {
    const header = document.createElement('h1')
    header.textContent = 'trackIt. Login'
    const form = document.createElement('form');

    //Login Form Email Field
    const emailLabel = document.createElement('label');
    const emailInput = document.createElement('input');
    emailLabel.textContent = "Email:"
    emailLabel.setAttribute('for', 'email');
    emailInput.id = "email";
    emailInput.type = "text";
    emailInput.placeholder = "Enter your email";

    //Login Form Password Field
    const passwordInput = document.createElement('input');
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = "Password:"
    passwordLabel.setAttribute('for', 'password');
    passwordInput.id = "password";
    passwordInput.type = "password";
    passwordInput.placeholder = "Enter your password";

    //Login Form Button 
    const loginButton = document.createElement('input');
    loginButton.setAttribute('type', 'submit');
    loginButton.setAttribute('value', 'Login');
    loginButton.id = "rendered-login-button";

    const formItems = [emailLabel, emailInput, passwordLabel, passwordInput, loginButton]
    formItems.forEach(item => form.append(item))

    //Scripts 
    const loginjs = document.createElement('script');
    const jwt_decodejs = document.createElement('script');
    loginjs.src = "../scripts/login.js";
    jwt_decodejs.src = "../scripts/jwt-decode.js";

    //Append Login Page Items
    const loginPageItems = [header, form, loginjs, jwt_decodejs]
    loginPageItems.forEach(item => body.appendChild(item))
}

// similar with registration page
function renderRegisterForm() {


}

function renderAddHabits() {

    
}


async function displayDashboard() {
    try {
        const dashboard = document.createElement('section')
        dashboard.id = 'dashboard' // for future styling
        const userInfo = await getUserInfo() // get user info will make a fetch request
        console.log(userInfo);
        const userHabits = userInfo.habits // will send habits attributes in the get request
        const renderHabit = habit => {
            const habitDetails = document.createElement('div'); // contains habitname and frequency for each user habit
            habitDetails.className = 'habit' // style all habits the same later
            const habitName = document.createElement('p');
            const habitFrequency = document.createElement('p')
            habitName.textContent = habit.habitName; // inserts habit name into div
            habitFrequency.textContent = habit.habitFrequency; // inserts frequency
            // we can add more habit details later
            habitDetails.appendChild(habitName);
            habitDetails.appendChild(habitFrequency)
            dashboard.appendChild(habitDetails);
        }
        userHabits.forEach(habit => renderHabit(habit))
        body.appendChild(dashboard); // add habits dashboard to the body page
    } catch (error) {
        console.log(error);
    }
}


function updateContent() {
    const path = window.location.hash; //check current path 
    if (privateRoutes.includes(path) && !currentUser()) { //if path private or user unknown in local storage prevent access to dashboard
        window.location.hash = '#'; //change to #login or #register???
    } else if (!privateRoutes.includes(path) && currentUser()) {
        window.location.hash = '#dashboard'; // if user known to local storage let them access the dashboard
    } else {
        updateBody(path); // render the corresponding page
    }
}