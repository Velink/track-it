const loginPageButton = document.getElementById('render-login');
loginPageButton.addEventListener('click', renderLoginForm);

const registerPageButton = document.getElementById('render-register');
registerPageButton.addEventListener('click', renderRegisterForm);

// we will set the ids + classes here so we can style them in css after
function renderLoginForm() {
    window.location.hash = '#login';
    // body.innerHTML = '';

    main.innerHTML = '';

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
    loginPageItems.forEach(item => main.appendChild(item))
}

// REGISTRATION FORM RENDER
function renderRegisterForm() {
    main.innerHTML = '';
    const fields = [
        { tag: 'input', attributes: { type: 'text', id: 'username', name: 'username', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'text', id: "register_email", name: 'email', placeholder: 'Email', } },
        { tag: 'input', attributes: { type: 'password', id: 'password', name: 'password', placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'password', id: 'passwordcon', name: 'passwordcon', placeholder: 'Confirm Password' } },
        { tag: 'button', attributes: { type: 'button', value: 'Create Account', id: 'submitButton' } }
    ]

    const outerDiv = document.createElement('div')
    const innerDiv = document.createElement('div')
    innerDiv.id = "mb-3"
    innerDiv.className = "inputs"

    // create form and attributes
    const form = document.createElement('form')

    const formAttributes = { id: "register_form", class: "w-50 mx-auto" }
    Object.entries(formAttributes).forEach(([a, v]) => form.setAttribute(a, v));

    // add a label for register
    const regLabel = document.createElement('label')
    const regLabelAttributes = { for: "register", class: "form-label display-6 lead" }
    Object.entries(regLabelAttributes).forEach(([a, v]) => regLabel.setAttribute(a, v));
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
    // form.addEventListener('submit', requestRegistration)
    main.appendChild(outerDiv);

    let submitButton = document.getElementById('submitButton');

    submitButton.addEventListener('click', async () => {
        let email = document.getElementById('register_email').value

        const userEmail = localStorage.setItem("userEmail", email);
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const passwordcon = document.getElementById('passwordcon').value;
        const storePassword = localStorage.setItem("password", password)
        const userData = { username: username, email: email, password: password, passwordcon: passwordcon }



        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        await fetch('http://localhost:3000/register', options)





        
        renderAddHabits()
    })


    window.location.hash = '#register';
}



// RENDER HABITS PAGE FUNCTION
function renderAddHabits() {
    let main = document.getElementById('main');
    main.innerHTML = '';

    // Create header
    let header_div = document.createElement('div')
    let header = document.createElement('h1')
    main.appendChild(header_div)
    header_div.appendChild(header)
    header.textContent = `Add a new habit!`
    header.setAttribute('class', 'display-3 w-50 mx-auto')

    // Create button
    let addHabitBtn = document.createElement('button')
    main.appendChild(addHabitBtn)
    addHabitBtn.setAttribute('class', 'btn btn-dark position-absolute top-10 start-0')
    addHabitBtn.id = `addHabitBtn`
    addHabitBtn.textContent = `New habit`

    // Create initial inputs fields
    let div_container = document.createElement('div')
    div_container.setAttribute('class', 'container')
    main.appendChild(div_container)
    let form = document.createElement('form')
    form.setAttribute('class', 'w-50 mx-auto')
    div_container.appendChild(form)
    let input_div = document.createElement('div')
    input_div.setAttribute('class', 'mb-3')
    form.appendChild(input_div)
    let label = document.createElement('label')
    label.setAttribute('for', 'register')
    label.setAttribute('class', 'form-label display-6 lead')
    input_div.appendChild(label)
    let div_row = document.createElement('div')
    input_div.appendChild(div_row)
    div_row.setAttribute("class", "row")
    let div_col = document.createElement('div')
    div_row.appendChild(div_col)
    div_col.setAttribute("class", "col-9")
    let habitInput = document.createElement('input')
    habitInput.setAttribute("type", "text")
    habitInput.id = `initHabit`
    habitInput.setAttribute("placeholder", "Add your habit name...")
    habitInput.setAttribute("class", "form-control form-rounded mb-3")
    div_col.appendChild(habitInput)
    let div_freq = document.createElement('div')
    div_freq.setAttribute("class", "col-3")
    div_row.appendChild(div_freq)
    let select = document.createElement('select')
    select.setAttribute("class", "form-select")
    div_freq.appendChild(select)
    let initialOption = document.createElement('option')
    select.appendChild(initialOption)
    initialOption.setAttribute("selected", "selected")
    initialOption.innerText = `Frequency`
    let submit_btn = document.createElement('button')
    submit_btn.setAttribute('type', 'submit')
    form.appendChild(submit_btn)

    for (let i = 1; i <= 7; i++) {
        let freq_option = document.createElement('option')
        freq_option.setAttribute("class", `freq_option_${i}`)
        freq_option.innerText = `${i}`
        freq_option.setAttribute("value", `${i}`)
        select.appendChild(freq_option)
    }
    // Create inputs fields on button click
    addHabitBtn.addEventListener('click', createHabitField);
    form.addEventListener('submit', submitData)


    function createHabitField() {
        console.log('mad')
        let inputCount = document.getElementsByTagName('input').length + 1
        // console.log(inputCount)
        if (inputCount > 5) { return alert('You may only create maximum 5 fields') }
        let div_row = document.createElement('div')
        input_div.appendChild(div_row)
        div_row.setAttribute("class", "row")
        let div_col = document.createElement('div')
        div_row.appendChild(div_col)
        div_col.setAttribute("class", "col-9")
        let habitInput = document.createElement('input')
        habitInput.setAttribute("type", "text")
        habitInput.setAttribute("placeholder", "Add your habit name...")
        habitInput.setAttribute("class", "form-control form-rounded mb-3")
        div_col.appendChild(habitInput)
        let div_freq = document.createElement('div')
        div_freq.setAttribute("class", "col-3")
        div_row.appendChild(div_freq)
        let select = document.createElement('select')
        select.setAttribute("class", "form-select")
        div_freq.appendChild(select)
        let initialOption = document.createElement('option')
        select.appendChild(initialOption)
        initialOption.setAttribute("selected", "selected")
        initialOption.innerText = `Frequency`
        for (let i = 1; i <= 7; i++) {
            let freq_option = document.createElement('option')
            freq_option.setAttribute("class", `freq_option_${i}`)
            freq_option.innerText = `${i}`
            freq_option.setAttribute("value", `${i}`)
            select.appendChild(freq_option)
        }

    }


}

// RENDER USER DASHBOARD PAGE
async function displayDashboard() {
    try {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../style.css');
        document.head.appendChild(link);

        var fontAwesome = document.createElement('link');
        fontAwesome.setAttribute('rel', 'stylesheet');
        fontAwesome.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css')
        document.head.appendChild(fontAwesome);

        let main = document.getElementById('main');
        //Create Dashboard Section
        const header = document.getElementsByTagName('HEADER')[0];
        header.innerHTML = '';
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
            let logOut = document.createElement('button');
            logOut.textContent = 'Logout';
            logOut.addEventListener('click', logout);

            // Habits Navbar Button
            let dashboardHabit = document.createElement('button');
            dashboardHabit.textContent = 'Add Habit';
            dashboardHabit.addEventListener('click', () => {

                // Create Form Habit Popup for submitting a new habit
                let addHabitForm = document.createElement('form');
                addHabitForm.setAttribute('class', 'add-habit-form');
                let habitNameLabel = document.createElement('label');
                habitNameLabel.textContent = 'Enter habit';
                let habitNameField = document.createElement('input');
                let habitFreqLabel = document.createElement('label');
                habitFreqLabel.textContent = 'Enter frequency';
                let habitFreqField = document.createElement('input');

                //Submit Habit Button
                let submitHabitButton = document.createElement('input');
                submitHabitButton.setAttribute('type', 'button');
                submitHabitButton.setAttribute('value', 'Add Habit');
                submitHabitButton.setAttribute('class', 'submit-add-habit');
                submitHabitButton.addEventListener('click', () => {
                    const newHabitName = habitNameField.value;
                    const newHabitFrequency = habitFreqField.value;
                    addHabitRequest(newHabitName, newHabitFrequency);
                    addHabitForm.innerHTML = '';
                })

                //Cancel Add Habit Button
                let cancelHabitButton = document.createElement('input');
                cancelHabitButton.setAttribute('type', 'button');
                cancelHabitButton.setAttribute('value', 'Cancel');
                cancelHabitButton.setAttribute('class', 'cancel-add-habit');
                cancelHabitButton.addEventListener('click', () => {
                    addHabitForm.innerHTML = '';
                })

                //Append elements to main
                addHabitForm.appendChild(habitNameLabel);
                addHabitForm.appendChild(habitNameField);
                addHabitForm.appendChild(habitFreqLabel);
                addHabitForm.appendChild(habitFreqField);
                addHabitForm.appendChild(submitHabitButton);
                addHabitForm.appendChild(cancelHabitButton);

                main.insertAdjacentElement('afterbegin', addHabitForm);
            });

            // Profile Navbar Button
            let profile = document.createElement('button');
            profile.textContent = 'Profile';
            navbar.appendChild(profile);
            navbar.appendChild(dashboardHabit);
            navbar.appendChild(logOut);
        }


        // CREATE USER HABITS SECTION 

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
        header.appendChild(navbar);

        //USER HABITS SECTION

        let habitSection = document.createElement('div');
        habitSection.setAttribute("class", "user-habits");
        let userHabits = userInfo.habits;
        for (let i = 0; i < userHabits.length; i++) {
            const habitElement = document.createElement('div');
            const freqP = document.createElement('p');
            const habitTitle = document.createElement('h1');
            habitTitle.setAttribute('class', 'habit-title');
            freqP.setAttribute('class', 'frequency');
            habitElement.setAttribute("class", "habit-card");
            habitTitle.textContent = userHabits[i].habit_name;
            freqP.textContent = userHabits[i].frq + '/7';
            habitElement.appendChild(habitTitle);
            habitElement.appendChild(freqP);

            // PLUS ICON button to tick off week days 
            let plusIcon = document.createElement('i');
            plusIcon.setAttribute('class', 'fas fa-plus fa-5x');
            habitElement.appendChild(plusIcon);

            //Progress Bars - To be Updated
            let bar = document.createElement('div');
            bar.setAttribute('id', 'progressbar');
            let barDiv = document.createElement('div');
            bar.appendChild(barDiv);
            habitElement.insertAdjacentElement('beforeend', bar);

            //Delete ICON button 
            let delIcon = document.createElement('i');
            delIcon.setAttribute('class', 'fas fa-trash-alt');
            habitElement.appendChild(delIcon);

            //Delete Buttons on Each Habit 
            let delButton = document.createElement('button');
            delButton.setAttribute('class', 'del-button');
            delButton.textContent = 'Delete';
            delButton.addEventListener('click', deleteHabitRequest);
            habitElement.appendChild(delButton);

            //Break Flex
            // if (i % 3 == 0) {
            //     let breakFlex = document.createElement('div');
            //     breakFlex.setAttribute('class', 'break');
            //     habitSection.appendChild(breakFlex);
            // }
            habitSection.appendChild(habitElement);
        }

        main.appendChild(habitSection);


    } catch (error) {
        console.log(error);
    }
}


// RENDER PUBLIC NAVBAR 
function renderPublicNav() {
    let header = document.getElementsByTagName('HEADER')[0];
    header.innerHTML = '';

    let navbar = document.createElement('nav');
    navbar.setAttribute('id', 'nav-bar');

    // Logout Navbar Button
    let logIn = document.createElement('button');
    logIn.textContent = 'Login';
    logIn.addEventListener('click', logout);

    // Habits Navbar Button
    let register = document.createElement('button');
    register.textContent = 'Register';
    register.setAttribute('id', 'render-register');
    register.addEventListener('click', renderRegisterForm);

    // Profile Navbar Button
    let home = document.createElement('button');
    home.textContent = 'Home';
    navbar.appendChild(logIn);
    navbar.appendChild(register);
    navbar.appendChild(home);
    header.appendChild(navbar);
}