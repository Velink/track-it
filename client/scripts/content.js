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
    // window.location.hash = '#register';
    const fields = [
        { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'password', name: 'passwordConfirmation', placeholder: 'Confirm Password' } },
        { tag: 'input', attributes: { type: 'button', value: 'Create Account', id: 'buttonRenderHabits' } }
    ]

    const outerDiv = document.createElement('div')
    const innerDiv = document.createElement('div')
    innerDiv.id = "mb-3"
    innerDiv.className = "inputs"

    // create form and attributes
    const form = document.createElement('form')
    const formAttributes = { id: "form", class: "w-50 mx-auto" }
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

    // Button Render Habits Event Listener
    let btnRenderHabits = document.getElementById('buttonRenderHabits');
    btnRenderHabits.addEventListener('click', renderAddHabits);

}




{/* <div>
        <h1 class="display-3 w-50 mx-auto">

            Add a new habit!
    
        </h1>

    </div>

    

    
        

        <button id="newHabitBtn" class="btn btn-dark position-absolute top-10 start-0">
             New habit 
            </button>
       
      

      <div class="container-fluid">

        <form id="form" action="" method="POST" class="w-50 mx-auto">
            <div class="mb-3" id="inputs">
              <label for="register" class="form-label display-6 lead"></label><br>
              <div class="row">
                  <div class="col-9">

                    <input
                    type="text"
                    placeholder="Add your habit name..."
                    class="form-control form-rounded mb-3"
                  
                  />

                  </div>
                  <div class="col-3">
                        <select class="form-select" aria-label="Disabled select example">
                            <option selected="selected">Frequency</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                          </select>
                    </div>

                  </div>

              </div>
             
            </div>
              <br>

              <div class="container">

                <button type="submit" class="btn btn-primary" id="submit_btn">Submit</button>

              </div>

              
            
          </form>

      </div> */}

// RENDER HABITS PAGE FUNCTION
function renderAddHabits() {
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
    div_container.setAttribute('class','container')
    main.appendChild(div_container)
    let form = document.createElement('form')
    form.id =  `form`
    div_container.appendChild(form)
    let div_row = document.createElement('div')
    let intialHabitField = document.createElement('div')
    intialHabitField.setAttribute('class', 'mb-3')
    let label = document.createElement('label')
    label.setAttribute('for','register')
    label.setAttribute('class','form-label display-6 lead')
    intialHabitField.id = `inputs`
    inputs.appendChild(div_row)
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


    // Create inputs fields on button click
    addHabitBtn.addEventListener('click', createHabitField);
}


function createHabitField() {
    let zsoeck = document.getElementsByTagName('input')
    if (habitFieldCounter > 3) { return alert('You may only create maximum 5 fields') }
    
    let inputs = document.getElementById('inputs')
    let div_row = document.createElement('div')
    inputs.appendChild(div_row)
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
