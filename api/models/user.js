const { init } = require('../dbConfig/init')
const { ObjectId } = require('mongodb')
// const { currentWeekNumber } = require('current-week-number')

class User {
    constructor(data) {
        this.id = data.id
        this.username = data.username
        this.email = data.email
        this.hash = data.hash // hash == hashed password
        this.habits = data.habits
    }

    // grab all users. may not need this
    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init()
                const userData = await db.collection('users').find().toArray()
                //mongodb gives a guid to each new insertion _id even though not explicit in schema
                const users = userData.map(u => new User({ ...u, id: u._id })) // create new user to access the methods e.g. delete etc.
                resolve(users);
            } catch (err) {
                console.log(err);
                reject("Error retrieving users")
            }
        })
    }

    // grab single user
    static findByEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                //_id is actually an object, ObjectId(id)
                let userData = await db.collection('users').find({ email: { $eq: email } }).toArray();
                console.log(userData);
                // let user = new User({ ...userData[0], id: userData[0]._id });
                // console.log(user);
                let user = userData[0];
                resolve(user);
            } catch (err) {
                console.log(err);
                reject('User not found');
            }
        });
    }

    static create(name, email, hash) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(habits[0]);
                const db = await init();
                let userData = await db.collection('users').insertOne({ username: name, email: email, hash: hash })
                console.log(userData);
                let newUser = new User(userData); // .rows
                resolve(newUser);
            } catch (err) {
                reject('Error creating user');
            }
        });
    }

    get habitsList() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const user = await db.collections('users').find({ _id: ObjectId(this.id) }); //mongo stores id as object
                const userHabits = user["habits"]; // user['habits'] should be stored in db as array we can push objects to
                resolve(userHabits);
            } catch (err) {
                reject('User not found');
            }
        });
    }

    //creates habit for single user
    static createHabit(userId, name, frequency) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const user = await db.collections('users').find({ _id: ObjectId(userId) });
                const userHabitsData = user["habits"];
                userHabitsData.push({ name: name, frequency: frequency })
                resolve(userHabitsData); //check if updates have been made
            } catch (err) {
                reject('Error creating user');
            }
        });
    }


    // --- get list of habits with frequencies by user's email
    static findHabitsForUser(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const user = await db.collection('users').find(({ email: { $eq: email } })).toArray();//.project({ email: 1, habits: 1 })
                const userHabits = { email: "", habits: {} } // object for response
                userHabits.email = user[0].email
                userHabits.habits = user[0].habits.map((a) => { return { habit_name: a.habit_name, frq: a.habit_frequency[a.habit_frequency.length - 1].frq } })
                resolve(userHabits);
            } catch (err) {
                reject("Users habits could not be found");
            };
        });
    };

    // --- update list of habits with frequencies by user's email
    // TODO
    updateHabitsForUser(email, newHabitsData) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                // const userHabits // 

                const existingHabitsData = await db.collection('users').find({ email: { $eq: email } }).project({ email: 1, habits: 1 });
                // const found = existingHabitsData.some

                resolve(existingHabitsData);
            } catch (err) {
                reject("Users habits could not be found");
            };
        });
    };



    // --- get list of habits with frequencies and completed_count for week  by user's email
    static findWeekDataTotal(email, week) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const user = await db.collection('users').find(({ email: { $eq: email } })).toArray();//.project({ email: 1, habits: 1 })
                //console.log(user)
                const WeekDataTotal = { email: "", habits: { habit_name: "", frq: "", habitCompletedCount: "" } } // object for response

                WeekDataTotal.email = user[0].email

                console.log(WeekDataTotal)
                console.log(user[0].habits)
                //console.log(user[0].habits[0].habit_frequency)
                //console.log(user[0].habits[0].habit_frequency[1])
                console.log(user[0].habits[0].habit_frequency.length)
                //console.log(user[0].habits[0].habit_frequency[user[0].habits[0].habit_frequency.length - 1])
                //console.log(user[0].habits[0].habit_frequency[user[0].habits[0].habit_frequency.length - 1].frq)
                for (let i = 0; i < user[0].habits[0].habit_frequency.length; i++) {
                    let habitName2 = user[0].habits[i].habit_name
                    let habitFrequency2 = user[0].habits[i].habit_frequency[user[0].habits[i].habit_frequency.length - 1].frq


                    const habitCompletedWeekNumber = user[0].habits[i].habit_completed_days.map(currentWeekNumber) // date to week number
                    console.log(habitCompletedWeekNumber)
                    //const habitCompletedThisWeek = habitCompletedWeekNumber.map((a) => { return a === week })// array of boolean, True if compl_date ===week 
                    //const countForWeek = habitCompletedThisWeek.reduce((total, el) => { return total + el }, 0)// sum of elemenys. Should be count of Trues


                    WeekDataTotal.habits = { habitName2: habitName2, habitFrequency2: habitFrequency2 }
                }
                console.log(WeekDataTotal.habits)

                // WeekDataTotal.habits = user[0].habits.map((a) => {
                //console.log(a.habit_frequency[a.habit_frequency.length - 1].frq)
                //     const habitFreq = a.habit_frequency[a.habit_frequency.length - 1].frq // getting last updated frequency for the habit
                //console.log('this is habitfreq' + habitFreq)
                //add  count for current week for each habit

                //   const habitCompletedWeekNumber = a.habit_completed_days.map(currentWeekNumber) // date to week number

                //     const habitCompletedThisWeek = habitCompletedWeekNumber.map((a) => { return a === week })// array of boolean, True if compl_date ===week 
                //     const countForWeek = habitCompletedThisWeek.reduce((total, el) => { return total + el }, 0)// sum of elemenys. Should be count of Trues

                console.log(countForWeek)

                // return { habit_name: a.habit_name, frq: habitFreq, habitCompletedCount: countForWeek }
                console.log(WeekDataTotal)
                resolve(WeekDataTotal);
            }

            catch (err) {
                reject("Data for this week could not be found");
            }
        })


    }




    // ---- for Habit page - single habit by habit_name, email, week number  - return days of the week whaen completed
    findWeekDataHabit(email, habitName, week) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const user = await db.collection('users').find({ email: { $eq: email } }).project({ email: 1, habits: 1 }); // getting all habits data for user

                const weekDataForHabit = { email: "", habitName: "", weekDaysWhenCompleted: [] } // creating object for response

                const findHabitByName = (habits, name) => {
                    const result = habits.filter(a => {
                        return a['habit_name'] === name;
                    });
                    return result;
                };

                const habitByName = findHabitByName(user.habits, habitName)

                weekDataForHabit.email = user.email
                weekDataForHabit.habitName = habitByName.habit_name

                const habitCompletedWeekNumber = habitByName.habit_completed_days.map(currentWeekNumber) // date to week number
                const habitCompletedThisWeek = habitCompletedWeekNumber.map((a) => { return a === week })//array of boolean, True if compl_date ===week 
                // const habitCompetedDatesToWeekdays = habitByName.habit_completed_days.map((a) => {return a.getDay() +1})




                //user.habits.map((a) =>{
                //   return {habitName: a.habit_name, }} )

                //  weekDataForHabit.days_completed = []

                resolve(WeekDataForHabit);
            } catch (err) {
                reject("Data for this week could not be found");
            };
        });
    };



}



module.exports = User;