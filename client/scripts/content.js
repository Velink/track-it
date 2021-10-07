const loginPageButton = document.getElementById('render-login');
loginPageButton.addEventListener('click', renderLoginForm);

const registerPageButton = document.getElementById('render-register');
registerPageButton.addEventListener('click', renderRegisterForm);

setInterval(addQuote, 3000);
setInterval(clearQuote, 3000);

async function addQuote() {
    let quoteContainer = document.getElementById('quote-container');
    let quotes = await generateQuotes();
    const rndInt = Math.floor(Math.random() * 7) + 1;
    let quote = quotes[rndInt];
    let quoteElement = document.createElement('p');
    let authorElement = document.createElement('h4');
    authorElement.setAttribute('class', 'quote-author')
    authorElement.textContent = `- ${quote.a}`;
    quoteElement.setAttribute('class', 'displayed-quote');
    quoteElement.textContent = quote.q;
    quoteElement.appendChild(authorElement);
    quoteContainer.appendChild(quoteElement);
}

async function clearQuote() {
    let quoteContainer = document.getElementById('quote-container');
    quoteContainer.innerHTML = '';
}


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
    introTitle.textContent = 'Login';
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
    loginjs.src = "./scripts/login.js";
    jwt_decodejs.src = "./scripts/jwt-decode.js";
    layoutjs.src = "./scripts/layout.js"

    //Append Login Page Items
    const loginPageItems = [header, form, loginjs, jwt_decodejs]
    loginPageItems.forEach(item => main.appendChild(item))
}

// REGISTRATION FORM RENDER
function renderRegisterForm() {
    main.innerHTML = '';
    window.location.hash = '#register';

    //Attach Styling before rendering 
    // let head = document.getElementsByTagName('head')[0];
    // let link = document.createElement('link');
    // link.setAttribute('rel', 'stylesheet');
    // link.setAttribute('href', '../style.css');
    // head.appendChild(link);

    const fields = [
        { tag: 'input', attributes: { type: 'text', id: 'username', name: 'username', placeholder: 'Username', class: 'reg-username' } },
        { tag: 'input', attributes: { type: 'text', id: "email", name: 'email', placeholder: 'Email', class: 'reg-email' } },
        { tag: 'input', attributes: { type: 'password', id: 'password', name: 'password', placeholder: 'Password', class: 'reg-password' } },
        { tag: 'input', attributes: { type: 'password', id: 'passwordcon', name: 'passwordcon', placeholder: 'Confirm Password', class: 'reg-password' } },
        { tag: 'button', attributes: { type: 'button', value: 'Create Account', id: 'submitButton', class: 'reg-button' } }
    ]

    const outerDiv = document.createElement('div')
    const innerDiv = document.createElement('div')
    innerDiv.id = "mb-3";
    innerDiv.className = "inputs";

    // create form and attributes
    const form = document.createElement('form');

    const formAttributes = { id: "register_form", class: "register-form" }
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
    submitButton.textContent = 'Create Account';

    submitButton.addEventListener('click', async (e) => {
        let email = document.getElementById('email').value
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

        const response = await fetch('https://trackitmathusan.herokuapp.com/register', options);
        const data = await response.json()
        console.log(data)
        console.log(data.error)
        if (data.error) {
            console.log(data.error.details[0].message)
            let errorMessage = data.error.details[0].message
            Toastify({
                text: `${errorMessage} `,
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function () { }, // Callback after click
            }).showToast();
        } else {
            Toastify({
                text: 'Registration successful! Choose some habits to get started.',
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function () { }, // Callback after click
            }).showToast();

        }
        await requestLogin(e)

        // renderAddHabits()

    })


    // window.location.hash = '#register';
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
    header.setAttribute('class', 'add-new-habit-title');

    // Create button
    let addHabitBtn = document.createElement('button')
    addHabitBtn.setAttribute('class', 'add-habit-button')
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
    initialOption.innerText = `Frequency`;

    // Submit Habits after registration button
    let submit_btn = document.createElement('button');
    submit_btn.setAttribute('type', 'submit');
    submit_btn.setAttribute('class', 'add-habit-button')
    submit_btn.textContent = 'Submit';
    form.appendChild(submit_btn);
    main.appendChild(addHabitBtn)

    for (let i = 1; i <= 7; i++) {
        let freq_option = document.createElement('option')
        freq_option.setAttribute("class", `freq_option_${i} `)
        freq_option.innerText = `${i} `
        freq_option.setAttribute("value", `${i} `)
        select.appendChild(freq_option)
    }
    // Create inputs fields on button click
    addHabitBtn.addEventListener('click', createHabitField);
    form.addEventListener('submit', submitHabits)


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
            freq_option.setAttribute("class", `freq_option_${i} `)
            freq_option.innerText = `${i} `
            freq_option.setAttribute("value", `${i} `)
            select.appendChild(freq_option)
        }

    }


}

// RENDER USER DASHBOARD PAGE
async function displayDashboard() {
    try {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './style.css');
        document.head.appendChild(link);

        var fontAwesome = document.createElement('link');
        fontAwesome.setAttribute('rel', 'stylesheet');
        fontAwesome.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css')
        document.head.appendChild(fontAwesome);

        let main = document.getElementById('main');
        //Create Dashboard Section
        const dashboard = document.createElement('section')
        dashboard.id = 'dashboard'

        //Obtain User Information 
        const userInfo = await allUserInfo()
        // console.log(userInfo);

        //USER HABITS SECTION

        let habitSection = document.createElement('div');
        habitSection.setAttribute("class", "user-habits");
        let userHabits = userInfo.habits;
        for (let i = 0; i < userHabits.length; i++) {
            const habitElement = document.createElement('div');
            const freqP = document.createElement('p');
            const habitTitle = document.createElement('h2');
            habitTitle.setAttribute('class', 'habit-title');
            freqP.setAttribute('class', 'frequency');
            habitElement.setAttribute("class", "habit-card");
            habitTitle.textContent = userHabits[i].habit_name; //HERE!!!
            let habitsArray = userInfo.habits;
            let currentHabit = habitsArray.find(habit => habit.habit_name == userHabits[i].habit_name);
            let count = currentHabit.count;
            // console.log(currentHabit);
            // console.log(count);
            freqP.textContent = `${currentHabit.count} / ${userHabits[i].frq}`;
            habitElement.appendChild(habitTitle);
            habitElement.appendChild(freqP);

            // PLUS ICON button to tick off week days 
            let plusIcon = document.createElement('i');
            plusIcon.setAttribute('class', 'fas fa-plus fa-5x');
            plusIcon.setAttribute('id', `plus-${userHabits[i].habit_name}`)
            habitElement.appendChild(plusIcon);
            plusIcon.addEventListener('click', (e) => {
                renderWeeklyProgressForm(e);
            })

            async function renderWeeklyProgressForm(e) {
                let habitSelected = e.target.id.slice(5, e.target.id.length);
                // console.log(habitSelected);

                let weeklyProgress = await getWeeklyProgress(habitSelected);
                // console.log(weeklyProgress);

                //Render Weekly Progress Popup
                let progressContainer = document.createElement('div');
                progressContainer.setAttribute('class', 'progress-container');

                //Progress Container Habit Title
                let progressTitle = document.createElement('h1');
                progressTitle.textContent = habitSelected;
                progressTitle.setAttribute('class', 'progress-container-title')
                progressContainer.insertAdjacentElement('afterbegin', progressTitle);

                let checkboxContainer = document.createElement('div');
                checkboxContainer.setAttribute('class', 'checkbox-container');
                for (let i = 0; i < 7; i++) {
                    let box = document.createElement('input');
                    let boxLabel = document.createElement('label');
                    box.setAttribute('type', 'checkbox');
                    box.setAttribute('class', 'check-box');
                    switch (i) {
                        case 0:
                            if (weeklyProgress[i] == 1) {
                                box.setAttribute('checked', 'true');
                            }
                            boxLabel.textContent = 'Mon'
                            break;
                        case 1:
                            if (weeklyProgress[i] == 1) {
                                box.setAttribute('checked', 'true');
                            }
                            boxLabel.textContent = 'Tue'
                            break;
                        case 2:
                            if (weeklyProgress[i] == 1) {
                                box.setAttribute('checked', 'true');
                            }
                            boxLabel.textContent = 'Wed'
                            break;
                        case 3:
                            if (weeklyProgress[i] == 1) {
                                box.setAttribute('checked', 'true');
                            }
                            boxLabel.textContent = 'Thurs'
                            break;
                        case 4:
                            if (weeklyProgress[i] == 1) {
                                box.setAttribute('checked', 'true');
                            }
                            boxLabel.textContent = 'Fri'
                            break;
                        case 5:
                            if (weeklyProgress[i] == 1) {
                                box.setAttribute('checked', 'true');
                            }
                            boxLabel.textContent = 'Sat'
                            break;
                        case 6:
                            if (weeklyProgress[i] == 1) {
                                box.setAttribute('checked', 'true');
                            }
                            boxLabel.textContent = 'Sun'
                            break;
                        default:
                            break;
                    }
                    boxLabel.appendChild(box);
                    checkboxContainer.appendChild(boxLabel);
                }

                //Ok Progress Popup Button
                let okButton = document.createElement('button');
                okButton.textContent = 'Submit';
                okButton.setAttribute('class', 'cancel-progress-container');
                okButton.addEventListener('click', async () => {
                    //Setting Up Completed Days Aray
                    let checkBoxTicks = document.getElementsByClassName('check-box');
                    let completedDaysArray = [0, 0, 0, 0, 0, 0, 0];
                    let newCount = 0;
                    for (let i = 0; i < checkBoxTicks.length; i++) {
                        if (checkBoxTicks[i].checked == true) {
                            // console.log(checkBoxTicks[0]);
                            completedDaysArray[i] = 1;
                            newCount++;
                        }
                    }
                    // console.log(newCount);
                    freqP.textContent = `${newCount} / ${userHabits[i].frq}`;
                    // console.log(completedDaysArray);
                    progressContainer.remove();
                    await updateWeeklyProgress(completedDaysArray, habitSelected);
                    let userInfo = await allUserInfo()
                    let habitsArray = userInfo.habits;
                    // console.log(`${habitsArray} THIS IS THE WAY`)
                    let currentHabit = habitsArray.find(habit => habit.habit_name == userHabits[i].habit_name);
                    // console.log(currentHabit.count)
                    let count = currentHabit.count;
                    let ratio = count / userHabits[i].frq
                    // console.log(`${count} is on button click`)
                    // console.log(userHabits[i].frq)
                    // console.log(ratio)
            switch(true){
                case (ratio>=1) :
                    barDiv.style.width = '100%';
                    barDiv.style.backgroundColor = 'greenyellow';
                    // console.log(barDiv.style.width)
                    break;
                case(ratio>=0.75 && ratio<1):
                    barDiv.style.width = `${ratio*100}%`;
                    barDiv.style.backgroundColor = 'green';
                    // console.log(barDiv.style.width)
                    break;
                case(ratio>=0.5 && ratio<0.75):
                    barDiv.style.width = `${ratio*100}%`;
                    barDiv.style.backgroundColor = 'yellow';
                    // console.log(barDiv.style.width)
                    break;
                case(ratio>=0.25 && ratio<0.5):
                    barDiv.style.width = `${ratio*100}%`;
                    barDiv.style.backgroundColor = 'orange';
                    // console.log(barDiv.style.width)
                    break;
                case(ratio>=0 && ratio<0.25):
                    barDiv.style.width = `${ratio*100}%`;
                    barDiv.style.backgroundColor = 'red';
                    // console.log(barDiv.style.width)
                    break;
                default:
                console.log('MAAAD');
            }

                })

                //Cancel Progress Popup Button
                let backButton = document.createElement('button');
                backButton.textContent = 'Cancel';
                backButton.setAttribute('class', 'cancel-progress-container');
                backButton.addEventListener('click', () => {
                    progressContainer.remove();
                })

                //Progress Container Button Div
                let buttonContainer = document.createElement('div');
                buttonContainer.setAttribute('class', 'button-container');
                buttonContainer.appendChild(backButton);
                buttonContainer.appendChild(okButton);

                progressContainer.appendChild(checkboxContainer);
                progressContainer.appendChild(buttonContainer);

                main.insertAdjacentElement('beforebegin', progressContainer);

            }

            //Progress Bars - To be Updated
            let bar = document.createElement('div');
            bar.setAttribute('id', 'progressbar');
            let barDiv = document.createElement('div');
            bar.appendChild(barDiv);
            habitElement.insertAdjacentElement('beforeend', bar);
            // dynamic progress bar
            // let userInfo = await userInfo()
            // let habitsArray = userInfo.habits;
            // let currentHabit = habitsArray.find(habit => habit.habit_name == userHabits[i].habit_name);
            // let count = currentHabit.count;
            let ratio = count/userHabits[i].frq 
            // console.log(`${count} is initial`)
            // console.log(userHabits[i].frq)
            // console.log(ratio)
            switch(true){
                case (ratio>=1) :
                    barDiv.style.width = '100%';
                    barDiv.style.backgroundColor = 'greenyellow';
                    // console.log(barDiv.style.width)
                    break;
                case(ratio>=0.75 && ratio<1):
                    barDiv.style.width = `${ratio*100}%`;
                    barDiv.style.backgroundColor = 'green';
                    // console.log(barDiv.style.width)
                    break;
                case(ratio>=0.5 && ratio<0.75):
                    barDiv.style.width = `${ratio*100}%`;
                    barDiv.style.backgroundColor = 'yellow';
                    // console.log(barDiv.style.width)
                    break;
                case(ratio>=0.25 && ratio<0.5):
                    barDiv.style.width = `${ratio*100}%`;
                    barDiv.style.backgroundColor = 'orange';
                    // console.log(barDiv.style.width)
                    break;
                case(ratio>=0 && ratio<0.25):
                    barDiv.style.width = `${ratio*100}%`;
                    barDiv.style.backgroundColor = 'red';
                    // console.log(barDiv.style.width)
                    break;
                default:
                console.log('MAAAD');
            }
            // console.log(barDiv.style.width)

            //Delete ICON button 
            let delIcon = document.createElement('i');
            delIcon.setAttribute('class', 'fas fa-trash-alt');
            habitElement.appendChild(delIcon);

            //Delete Buttons on Each Habit 
            let delButton = document.createElement('button');
            delButton.setAttribute('class', 'del-button');
            delButton.textContent = 'Delete';
            delButton.setAttribute('id', `del-${userHabits[i].habit_name}`)
            // delButton.addEventListener('click', deleteHabitRequest);
            habitElement.appendChild(delButton);
            delButton.addEventListener('click', (e) => {
                deleteHabitRequest(e);
                const del = document.getElementById(`${e.target.id}`)
                // console.log(del.parentElement)
                del.parentElement.remove()
            })
            // async function deleteHabit(e) {
            //     console.log(e.target.id);
            // }

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
        // console.log(error);
    }
}


//CREATE NEW HABIT AND UPDATE DOM
async function renderNewHabits() {
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
    submitHabitButton.setAttribute('class', 'submit-add-habit');  // HERES

    //Cancel Add Habit Button
    let cancelHabitButton = document.createElement('input');
    cancelHabitButton.setAttribute('type', 'button');
    cancelHabitButton.setAttribute('value', 'Cancel');
    cancelHabitButton.setAttribute('class', 'cancel-add-habit');

    //Append elements to main
    addHabitForm.appendChild(habitNameLabel);
    addHabitForm.appendChild(habitNameField);
    addHabitForm.appendChild(habitFreqLabel);
    addHabitForm.appendChild(habitFreqField);
    addHabitForm.appendChild(submitHabitButton);
    addHabitForm.appendChild(cancelHabitButton);

    //FORM INSERTED TO MAIN
    main.insertAdjacentElement('afterbegin', addHabitForm);

    //EVENT LISTENERS
    submitHabitButton.addEventListener('click', async () => {
        const newHabitName = habitNameField.value;
        const newHabitFrequency = habitFreqField.value;
        await addHabitRequest(newHabitName, newHabitFrequency);
        main.innerHTML = '';
        await displayDashboard();
        addHabitForm.innerHTML = '';
    })

    cancelHabitButton.addEventListener('click', () => {
        addHabitForm.remove();
    })

}

// RENDER PRIVATE NAVBAR
function renderPrivateNav() {
    const header = document.getElementsByTagName('HEADER')[0];
    header.innerHTML = '';
    //Create Navbar

    let navbar = document.createElement('nav');
    navbar.setAttribute('id', 'nav-bar');
    if (currentUser()) {
        //Navbar Logo 
        let logo = document.createElement('i');
        logo.setAttribute('class', 'fas fa-check-circle fa-2x');

        //Navbar Title
        let titleNavbar = document.createElement('h1');
        titleNavbar.textContent = 'trackIt.'

        // Logout Navbar Button
        let logOut = document.createElement('button');
        logOut.textContent = 'Logout';
        logOut.addEventListener('click', logout);

        // Habits Navbar Button
        let dashboardHabit = document.createElement('button');
        dashboardHabit.textContent = 'Add Habit';
        dashboardHabit.addEventListener('click', () => {
            renderNewHabits();
        });

        // Profile Navbar Button
        let profile = document.createElement('button');
        profile.textContent = 'Profile';
        navbar.appendChild(titleNavbar);
        navbar.appendChild(profile);
        navbar.appendChild(dashboardHabit);
        navbar.appendChild(logOut);
        navbar.appendChild(logo);
    }
    header.appendChild(navbar);
}

// RENDER PUBLIC NAVBAR 
function renderPublicNav() {
    let header = document.getElementsByTagName('HEADER')[0];
    header.innerHTML = '';

    let navbar = document.createElement('nav');
    navbar.setAttribute('id', 'nav-bar');

    //Navbar img
    let navImg = document.createElement('img');
    navImg.setAttribute('src', './assets/output-onlinepngtools.png');
    navImg.setAttribute('width', '50px');

    //Navbar Title
    let titleNavbar = document.createElement('h1');
    titleNavbar.textContent = 'trackIt.'

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
    let homeLink = document.createElement('a');
    homeLink.setAttribute('href', './');
    homeLink.setAttribute('class', 'home-link');
    homeLink.textContent = 'Home';
    home.appendChild(homeLink);
    navbar.appendChild(titleNavbar);
    navbar.appendChild(home);
    navbar.appendChild(logIn);
    navbar.appendChild(register);
    navbar.appendChild(navImg);
    header.appendChild(navbar);
}