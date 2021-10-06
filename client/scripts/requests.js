async function submitData(e) {
  e.preventDefault()

  let userEmail = localStorage.getItem("userEmail");
  let password = localStorage.getItem("password");
  sendingObject = {email: userEmail}
  sendingObject.newHabitsArr = []
  let habits = document.getElementsByTagName('input')
  console.log(sendingObject)
//   console.log(habits)
  for (let habit of habits){
    let habitList = {habitName: habit.value}
    sendingObject.newHabitsArr.push(habitList)
  }
//   console.log(habitData)
  let frequencySelectors = document.getElementsByTagName('select');
//   console.log(frequencySelectors)
  for(let i = 0 ; i < frequencySelectors.length ; i++){
    let newFreq = frequencySelectors[i].options.selectedIndex
    sendingObject.newHabitsArr[i].frequency = newFreq
  }
  console.log(sendingObject) // returns an array of format = [{habit: <habitname>, frequency: <frequency>}]

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
  const response = await fetch(`http://localhost:3000/login`, options2);
  const data = await response.json()
  let token = data.token;

  // let token = localStorage.getItem('token')
  const options = {
    method: 'PATCH',
    headers: { 'Authorization': token, "Content-Type": "application/json" },
    body: JSON.stringify(sendingObject) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`http://localhost:3000/user/${userEmail}/choose_habits`, options) // choose where to send it to
//   const resp2 = await resp.json()
//   console.log(resp2)

}


// REQUEST TO ADD A NEW HABIT FROM DASHBOARD
async function addHabitRequest(habit, frequency) {

  let userEmail = localStorage.getItem("userEmail");
  console.log(userEmail);

  let habitData = { email: userEmail, habitName: habit, frequency: frequency }

  const options = {
    method: 'PATCH',
    headers: { 'Authorization': localStorage.getItem('token'), "Content-Type": "application/json" },
    body: JSON.stringify(habitData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`http://localhost:3000/user/${userEmail}/choose_habits`, options) // choose where to send it to
  const resp2 = await resp.json()
  console.log(resp2)

}

// REQUEST TO DELETE A USER HABIT
async function deleteHabitRequest() {

    let userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);
  
    let habitData = { email: userEmail, habitName: habit}
  
    const options = {
      method: 'DELETE',
      headers: { 'Authorization': localStorage.getItem('token'), "Content-Type": "application/json" },
      body: JSON.stringify(habitData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
    }
    const resp = await fetch(`http://localhost:3000/user/${userEmail}/choose_habits`, options) // choose where to send it to
    const resp2 = await resp.json()
    console.log(resp2)
  

}
