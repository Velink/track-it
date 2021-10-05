const loginPageButton = document.getElementById('render-login');
loginPageButton.addEventListener('click', renderLoginForm);

// we will set the ids + classes here so we can style them in css after
function renderLoginForm() {
    body.innerHTML = '';
    const header = document.createElement('h1');
    header.setAttribute('class', 'intro-title');
    header.textContent = 'Rendered trackIt. Login'
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

function renderRegisterForm() {
    const fields = [
        { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'password', name: 'passwordConfirmation', placeholder: 'Confirm Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Create Account' } }
    ]

    const outerDiv = document.createElement('div')
    const innerDiv = document.createElement('div')
    innerDiv.id = "mb-3"
    innerDiv.className = "inputs"

    // create form and attributes
    const form = document.createElement('form')
    const formAttributes = {id: "form", class: "w-50 mx-auto"}
    Object.entries(formAttributes).forEach(([a,v]) => form.setAttribute(a,v));

    // add a label for register
    const regLabel = document.createElement('label')
    const regLabelAttributes = {for:"register", class:"form-label display-6 lead"}
    Object.entries(regLabelAttributes).forEach(([a,v]) => regLabel.setAttribute(a,v));
    regLabel.textContent = "Register"
    innerDiv.appendChild(regLabel)

    // create inputs, assign properties, put them in innerDiv
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            innerDiv.appendChild(field);
        })
    })

    form.appendChild(innerDiv)
    outerDiv.appendChild(form)
    outerDiv.className = "container"
    form.addEventListener('submit', requestRegistration)
    main.appendChild(outerDiv);
}

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
