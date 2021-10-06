async function submitData(e) {
  e.preventDefault()
  // habitData = []
  // let habits = document.getElementsByTagName('input')
  // for (let habit of habits){
  //   let habitList = {habitName: habit.value}
  //   habitData.push(habitList)
  // }
  // let frequencySelectors = document.getElementsByTagName('select');
  // console.log(frequencySelectors)
  // for(let i = 0 ; i < frequencySelectors.length ; i++){
  //   let newFreq = frequencySelectors[i].options.selectedIndex
  //   habitData[i].frequency = newFreq
  // }
  // console.log(habitData) // returns an array of format = [{habit: <habitname>, frequency: <frequency>}]

  //get email first and then add that to the habitsdata



  let habit = document.getElementById('initHabit').value
  // console.log(habit)
  let frequency = document.getElementsByTagName('select')[0].value
  // console.log(frequency)
  let userEmail = localStorage.getItem("userEmail");
  let password = localStorage.getItem("password");
  let postingData = { email: userEmail, habitName: habit, frequency: frequency }
  // console.log(postingData)
  // {
  //     'Content-Type': 'application/json',

  // console.log(token)
  // },


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

  const response = await fetch(`http://localhost:3000/login`, options2);
  const data = await response.json()
  let token = data.token;

  // let token = localStorage.getItem('token')
  const options = {
    method: 'PATCH',
    headers: { 'Authorization': token, "Content-Type": "application/json" },
    body: JSON.stringify(postingData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`http://localhost:3000/user/${userEmail}/choose_habits`, options) // choose where to send it to
  const resp2 = await resp.json()
  console.log(resp2)

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

}
