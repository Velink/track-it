async function submitHabits(e) {
  e.preventDefault()

  let userEmail = localStorage.getItem("userEmail");
  let password = localStorage.getItem("password");

  sendingObject = { email: userEmail }
  sendingObject.newHabitsArr = []
  let habits = document.getElementsByTagName('input')
  console.log(sendingObject)
  //   console.log(habits)
  for (let habit of habits) {
    let habitList = { habitName: habit.value }
    sendingObject.newHabitsArr.push(habitList)
  }
  //   console.log(habitData)
  let frequencySelectors = document.getElementsByTagName('select');
  //   console.log(frequencySelectors)
  for (let i = 0; i < frequencySelectors.length; i++) {
    let newFreq = frequencySelectors[i].options.selectedIndex
    sendingObject.newHabitsArr[i].frequency = newFreq
  }
  console.log(sendingObject) // returns an array of format = {email:userEmail, newHabitsArr : [{habitName: <habitname>, frequency: <frequency>}]

  //   get email first and then add that to the habitsdata



  //   let habit = document.getElementById('initHabit').value
  //   let frequency = document.getElementsByTagName('select')[0].value

  //   let postingData = { email: userEmail, habitName: habit, frequency: frequency }

  const loginData = {
    email: userEmail,
    password: password
  }

  let options2 = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    },
  }

  // Fetch the token 
  const response = await fetch(`https://trackitmathusan.herokuapp.com/login`, options2);
  const data = await response.json()
  let token = data.token;

  // let token = localStorage.getItem('token')
  const options = {
    method: 'PATCH',
    headers: { 'Authorization': token, "Content-Type": "application/json" },
    body: JSON.stringify(sendingObject) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`https://trackitmathusan.herokuapp.com/user/${userEmail}/choose_habits`, options) // choose where to send it to
  //   const resp2 = await resp.json()
  //   console.log(resp2)

  window.location.hash = `#dashboard`

}


// REQUEST TO ADD A NEW HABIT FROM DASHBOARD
async function addHabitRequest(habit, frequency) {

  let userEmail = localStorage.getItem("userEmail");
  console.log(userEmail);

  let habitData = { email: userEmail, newHabitsArr: [{ habitName: habit, frequency: frequency }] }

  const options = {
    method: 'PATCH',
    headers: { 'Authorization': localStorage.getItem('token'), "Content-Type": "application/json" },
    body: JSON.stringify(habitData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`https://trackitmathusan.herokuapp.com/user/${userEmail}/choose_habits`, options) // choose where to send it to
  //   const resp2 = await resp.json()
  //   console.log(resp2)

}

// REQUEST TO DELETE A USER HABIT
async function deleteHabitRequest(e) {
  let habitToDelete = e.target.id

  let userEmail = localStorage.getItem("userEmail");

  let habitData = { email: userEmail, habit_name: habitToDelete }
  ///:email/:habit/delete
  const options = {
    method: 'DELETE',
    headers: { 'Authorization': localStorage.getItem('token'), "Content-Type": "application/json" },
    body: JSON.stringify(habitData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`https://trackitmathusan.herokuapp.com/user/${userEmail}/${habitToDelete}/delete`, options) // choose where to send it to
  //   const resp2 = await resp.json()
  //   console.log(resp2)
}


// REQUEST UPDATE WEEKLY PROGRESS FOR A HABIT 
async function updateWeeklyProgress(daysArray, habitSelected) {

  console.log(daysArray);

  let userEmail = localStorage.getItem("userEmail");
  console.log(userEmail);

  let habitData = { email: userEmail, habit_name: habitSelected, completed_days: daysArray }
  console.log(habitData);

  const options = {
    method: 'PATCH',
    headers: { 'Authorization': localStorage.getItem('token'), "Content-Type": "application/json" },
    body: JSON.stringify(habitData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`https://trackitmathusan.herokuapp.com/user/${userEmail}/${habitSelected}/update_dates`, options) // choose where to send it to
  const resp2 = await resp.json()
  console.log(resp2)
}

//REQUEST TO FETCH LIVE WEEKLY PROGRESS 
async function getWeeklyProgress(habitSelected) {

  let userEmail = localStorage.getItem("userEmail");
  console.log(userEmail);

  let habitData = { email: userEmail, habit_name: habitSelected }
  console.log(habitData);

  const options = {
    method: 'GET',
    headers: { 'Authorization': localStorage.getItem('token'), "Content-Type": "application/json" },
    // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`https://trackitmathusan.herokuapp.com/user/${userEmail}/${habitSelected}`, options) // choose where to send it to
  const resp2 = await resp.json()
  console.log(resp2);
  console.log(resp2.habit);
  console.log(resp2.habit[0].completed_days);
  let currentCompletedDays = resp2.habit[0].completed_days;
  return currentCompletedDays;
}


// REQUEST ALL USER DATA FOR DASHBOARD 
async function allUserInfo(userEmail) {
  try {
    console.log(userEmail);
    let email = localStorage.userEmail;
    console.log(email);

    const options = {
      headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
    }
    const response = await fetch(`https://trackitmathusan.herokuapp.com/user/${email}/dashboard`, options);
    const data = await response.json();

    console.log(data);
    console.log(data.body);
    return data;
  } catch (err) {
    console.warn(err);
  }

}


// FETCH MOTIVATIONAL QUOTES
async function generateQuotes() {
  let mode = 'quotes';
  let key = 'b727b7859776ae18fef3449a4349402058a01a0f'

  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      "Content-Type": "application/json"
    },
    // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }

  const response = await fetch(`https://zenquotes.io/api/${mode}/${key}`, options);
  console.log(response);
  const data = await response.json();
  console.log(response.body);
  console.log(data);
}

generateQuotes();