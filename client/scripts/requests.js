function submitData(e){
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
    let userEmail = localStorage.getItem("userEmail")
    let postingData = {email: userEmail, habitName: habit, frequency:frequency}
    // console.log(postingData)
  
    const options = {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(postingData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
    }
    fetch(`http://localhost:3000/${userEmail}/choose_habits`, options) // choose where to send it to
    
  }