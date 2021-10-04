var habitFieldCounter = 0
var habitData = []

const newHabitBtn = document.getElementById('newHabitBtn')
const form = document.getElementById('form')
 
newHabitBtn.addEventListener('click', createHabitField)
form.addEventListener('submit', submitData)

{/* <div class="row">
                  <div class="col-9">

                    <input
                    type="text"
                    placeholder="Add your habit name..."
                    class="form-control form-rounded mb-2"
                    id="habit"
                  />

                  </div>
                  <div class="col-3">
                        <select class="form-select" aria-label="Disabled select example">
                            <option selected>Frequency</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="1">4</option>
                            <option value="2">5</option>
                            <option value="3">6</option>
                          </select>
                    </div>
                  </div> */}

function createHabitField() {
    if( habitFieldCounter > 3 ){ return alert('You may only create maximum 5 fields')}
    habitFieldCounter++
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
    for( let i = 1 ; i <= 7 ; i++){
        let freq_option = document.createElement('option')
        freq_option.setAttribute("class", `freq_option_${i}`)
        freq_option.innerText = `${i}`
        freq_option.setAttribute("value", `${i}`)
        select.appendChild(freq_option)
    }

}

function submitData(e){
  e.preventDefault()
  let habits = document.getElementsByTagName('input')
  // console.log(freq_value)
  for (let habit of habits){
    let habitList = {habit: habit.value}
    habitData.push(habitList)
  }
  let frequencySelectors = document.getElementsByTagName('select');
  console.log(frequencySelectors)
  for(let i = 0 ; i < frequencySelectors.length ; i++){
    let newFreq = frequencySelectors[i].options.selectedIndex
    habitData[i].frequency = newFreq
  }

  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(habitData) // sends data of all chosen habits in the form of =>    habitData = [{habit: chosenhabit, frequency: chosen frequency}]
  }
  fetch('http://localhost:3000/posts', options) // choose where to send it to
  
}




