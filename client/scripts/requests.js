async function submitHabits(e) {
  e.preventDefault()

  

  let userEmail = localStorage.getItem("userEmail");
  let password = localStorage.getItem("password");

  sendingObject = { email: userEmail }
  sendingObject.newHabitsArr = []

  let habits = document.getElementsByTagName('input')
  let frequencySelectors = document.getElementsByTagName('select');

//   console.log(habits[0].value)
//   console.log(habits[1].value)
// sendingObject = {email: email, newHabitsArr: [{habitname:habitname, frequency:frequency},{...}]}
for (let i = 0 ; i < habits.length ; i++){
    // console.log(habits[i].value.length)
    if(habits[i].value.length > 2){
        Toastify({
          text: `Added habit : ${habits[i].value} ! `,
          duration: 10000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          stopOnFocus: true, // Prevents dismissing of toast on hover
          onClick: function () { }, // Callback after click
      }).showToast();
      let habitObject = { habitName: habits[i].value }
      sendingObject.newHabitsArr.push(habitObject)
    
    //   console.log(sendingObject)
    let newFreq = frequencySelectors[i].options.selectedIndex
    sendingObject.newHabitsArr[i].frequency = newFreq
    //   console.log(sendingObject)
} else {


    Toastify({
        text: `Your habit "${habits[i].value}" must be minimum 3 characters, try using a longer name!`,
        duration: 10000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () { }, // Callback after click
    }).showToast();

    sendingObject.newHabitsArr.push(`QWE`)
    

}


}

console.log(sendingObject.newHabitsArr)
// for(let i = 0 ; i < sendingObject.newHabitsArr.length ; i++){
//     if(sendingObject.newHabitsArr[i] === {}){
//         sendingObject.newHabitsArr.splice(i,1)
//     }

// }

sendingObject.newHabitsArr = sendingObject.newHabitsArr.filter((object) => {
    return object !== `QWE`
})

console.log(sendingObject.newHabitsArr)


//   console.log(sendingObject)
  //   console.log(habits)
//   for (let habit of habits) {
//       console.log(habit.value.length)
//       if(habit.value.length > 2){
//         Toastify({
//           text: `Added habit : ${habit.value} ! `,
//           duration: 10000,
//           close: true,
//           gravity: "top", // `top` or `bottom`
//           position: "left", // `left`, `center` or `right`
//           backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//           stopOnFocus: true, // Prevents dismissing of toast on hover
//           onClick: function () { }, // Callback after click
//       }).showToast();
//       let habitList = { habitName: habit.value }
//       sendingObject.newHabitsArr.push(habitList)
    
//       } else {
//               Toastify({
//                   text: `Your habit "${habit.value}" must be mnimum 3 characters, try using a longer name!`,
//                   duration: 10000,
//                   close: true,
//                   gravity: "top", // `top` or `bottom`
//                   position: "left", // `left`, `center` or `right`
//                   backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//                   stopOnFocus: true, // Prevents dismissing of toast on hover
//                   onClick: function () { }, // Callback after click
//               }).showToast();
        
//           }
      
//   }
//   //   console.log(habitData)
//   let frequencySelectors = document.getElementsByTagName('select');
//   //   console.log(frequencySelectors)
//   for (let i = 0; i < frequencySelectors.length; i++) {
//     let newFreq = frequencySelectors[i].options.selectedIndex
//     sendingObject.newHabitsArr[i].frequency = newFreq
//   }
//   console.log(sendingObject) // returns an array of format = {email:userEmail, newHabitsArr : [{habitName: <habitname>, frequency: <frequency>}]

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
console.log(`IM HERE IN SUBMIT HABITS`)
  // let token = localStorage.getItem('token')
  const options = {
    method: 'PATCH',
    headers: { 'Authorization': token, "Content-Type": "application/json" },
    body: JSON.stringify(sendingObject) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`https://trackitmathusan.herokuapp.com/user/${userEmail}/choose_habits`, options) // choose where to send it to
// //   console.log(`im out of the fetch`)
// //   const data_resp = await resp.json()
// //   console.log(data_resp.error)
// //   console.log(data_resp.error)
//   if (resp.error) {
//       console.log(resp.error.details[0].message)
//       let errorMessage = resp.error.details[0].message
//       Toastify({
//           text: `${errorMessage}`,
//           duration: 10000,
//           close: true,
//           gravity: "top", // `top` or `bottom`
//           position: "left", // `left`, `center` or `right`
//           backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//           stopOnFocus: true, // Prevents dismissing of toast on hover
//           onClick: function () { }, // Callback after click
//       }).showToast();
//   } else {
//       Toastify({
//           text: 'Registration successful! Choose some habits to get started.',
//           duration: 10000,
//           close: true,
//           gravity: "top", // `top` or `bottom`
//           position: "left", // `left`, `center` or `right`
//           backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//           stopOnFocus: true, // Prevents dismissing of toast on hover
//           onClick: function () { }, // Callback after click
//       }).showToast();

//   }
//   if(await resp.json()){
//     const data_resp = await resp.json()
//     console.log(`The await was truthy so => ${data_resp}`)
//   } else {
//     console.log(`The await was falsy so => ${resp}`)
//   }
  

  window.location.hash = `#dashboard`

}


// REQUEST TO ADD A NEW HABIT FROM DASHBOARD
async function addHabitRequest(habit, frequency) {

  let userEmail = localStorage.getItem("userEmail");
//   console.log(userEmail);

  let habitData = { email: userEmail, newHabitsArr : [{habitName: habit, frequency: frequency}] }

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

//   console.log(daysArray);

  let userEmail = localStorage.getItem("userEmail");
//   console.log(userEmail);

  let habitData = { email: userEmail, habit_name: habitSelected, completed_days: daysArray }
//   console.log(habitData);

  const options = {
    method: 'PATCH',
    headers: { 'Authorization': localStorage.getItem('token'), "Content-Type": "application/json" },
    body: JSON.stringify(habitData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`https://trackitmathusan.herokuapp.com/user/${userEmail}/${habitSelected}/update_dates`, options) // choose where to send it to
  const resp2 = await resp.json()
//   console.log(resp2)
}

//REQUEST TO FETCH LIVE WEEKLY PROGRESS 
async function getWeeklyProgress(habitSelected) {

  let userEmail = localStorage.getItem("userEmail");
//   console.log(userEmail);

  let habitData = { email: userEmail, habit_name: habitSelected }
//   console.log(habitData);

  const options = {
    method: 'GET',
    headers: { 'Authorization': localStorage.getItem('token'), "Content-Type": "application/json" },
    // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  const resp = await fetch(`https://trackitmathusan.herokuapp.com/user/${userEmail}/${habitSelected}`, options) // choose where to send it to
  const resp2 = await resp.json()
//   console.log(resp2);
//   console.log(resp2.habit);
//   console.log(resp2.habit[0].completed_days);
  let currentCompletedDays = resp2.habit[0].completed_days;
  return currentCompletedDays;
}


// REQUEST ALL USER DATA FOR DASHBOARD 
async function allUserInfo(userEmail) {
  try {
    // console.log(userEmail);
    let email = localStorage.userEmail;
    // console.log(email);

    const options = {
      headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
    }
    const response = await fetch(`https://trackitmathusan.herokuapp.com/user/${email}/dashboard`, options);
    const data = await response.json();

    // console.log(data);
    // console.log(data.body);
    return data;
  } catch (err) {
    console.warn(err);
  }

}
