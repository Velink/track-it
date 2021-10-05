const loginPageButton = document.getElementById('render-login');
loginPageButton.addEventListener('click', renderLoginForm);

const homeMain = document.getElementById('main');

// we will set the ids + classes here so we can style them in css after
function renderLoginForm() {
    window.location.hash = '#login';
    // body.innerHTML = '';

    homeMain.innerHTML = '';

    // Header Created
    const header = document.createElement('header');

    // Navbar Created
    // const navbar = document.createElement('nav');
    // navbar.setAttribute('id', 'nav-bar');
    // const navLoginButton = document.createElement('button');
    // navLoginButton.textContent = 'Login';
    // const navRegisterButton = document.createElement('button');
    // navRegisterButton.textContent = 'Register';
    // const navHomeButton = document.createElement('button');
    // navHomeButton.textContent = 'Home';
    // navbar.appendChild(navLoginButton);
    // navbar.appendChild(navRegisterButton);
    // navbar.appendChild(navHomeButton);
    // header.appendChild(navbar);

    // Intro Title Created
    const introTitle = document.createElement('h1');
    introTitle.setAttribute('class', 'intro-title');
    introTitle.textContent = 'Rendered trackIt. Login';
    header.appendChild(introTitle);

    // Form Created
    const form = document.createElement('form');
    form.setAttribute('class', 'login-form')

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
    loginButton.id = "login-button";
    loginButton.addEventListener('click', (e) => {
        requestLogin(e);
    })

    const formItems = [emailLabel, emailInput, passwordLabel, passwordInput, loginButton]
    formItems.forEach(item => form.append(item))

    //Scripts 
    const loginjs = document.createElement('script');
    const jwt_decodejs = document.createElement('script');
    const layoutjs = document.createElement('script');
    loginjs.src = "../scripts/login.js";
    jwt_decodejs.src = "../scripts/jwt-decode.js";
    layoutjs.src = "../scripts/layout.js"

    //Append Login Page Items
    const loginPageItems = [header, form, loginjs, jwt_decodejs]
    loginPageItems.forEach(item => body.appendChild(item))
}

// similar with registration page


async function displayDashboard() {
    try {
        //Create Dashboard Section
        const dashboard = document.createElement('section')
        dashboard.id = 'dashboard'

        //Obtain User Information 
        const userInfo = await getUserInfo()
        console.log(userInfo);

        //Create Navbar
        let navbar = document.createElement('nav');
        navbar.setAttribute('id', 'nav-bar');
        if (currentUser()) {
            // Logout Navbar Button
            let logOut = document.createElement('a');
            logOut.textContent = 'Logout';
            logOut.addEventListener('click', logout);

            // Habits Navbar Button
            let linkHabits = document.createElement('a');
            linkHabits.textContent = 'Habits';

            // Profile Navbar Button
            let profile = document.createElement('a');
            profile.textContent = 'Profile';
            navbar.appendChild(profile);
            navbar.appendChild(linkHabits);
            navbar.appendChild(logOut);
        }

        // const userHabits = userInfo.habits 
        // const renderHabit = habit => {
        //     const habitDetails = document.createElement('div'); 
        //     habitDetails.className = 'habit' 
        //     const habitName = document.createElement('p');
        //     const habitFrequency = document.createElement('p')
        //     habitName.textContent = habit.habitName; 
        //     habitFrequency.textContent = habit.habitFrequency; 
        //     habitDetails.appendChild(habitName);
        //     habitDetails.appendChild(habitFrequency);
        //     dashboard.appendChild(habitDetails);
        // }
        // userHabits.forEach(habit => renderHabit(habit))
        // body.appendChild(dashboard); 
        body.appendChild(navbar);
    } catch (error) {
        console.log(error);
    }
}
