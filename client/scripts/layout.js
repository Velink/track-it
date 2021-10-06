// const body = document.querySelector('body');
const main = document.querySelector('main');
// we can make a body element or main, doesnt matter

const publicRoutes = ['#login', '#register'];
const privateRoutes = ['#dashboard','#addhabits'];

window.addEventListener('hashchange', updateContent);
function updateBody(path) {
    main.innerHTML = '';
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
            case '#addhabits':
                renderAddHabits();
                break;
        }
    } else {
        renderLoginForm();
    }
}

function updateContent() {
    // console.log('content update');
    const path = window.location.hash; //check current path 
    // let currentuser = currentUser()
    // console.log(currentuser)
    if (privateRoutes.includes(path) && !currentUser()) { //if path private or user unknown in local storage prevent access to dashboard
        console.log('inside 1')
        window.location.hash = '#'; //change to #login or #register???
    } else if (!privateRoutes.includes(path) && currentUser()) {
        console.log('inside  2')
        window.location.hash = '#dashboard'; // if user known to local storage let them access the dashboard
    } else {
        console.log('inside 3');
        updateBody(path); // render the corresponding page
    }
}

updateContent()


