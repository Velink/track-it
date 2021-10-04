var habitFieldCounter = 0

const newHabitBtn = document.getElementById('newHabitBtn')
 
newHabitBtn.addEventListener('click', createHabitField)

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
    if( habitFieldCounter > 3 ){ return alert('boo')}
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