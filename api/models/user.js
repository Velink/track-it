const { init } = require('../dbConfig/init')
const { ObjectId } = require('mongodb')
// const { currentWeekNumber } = require('current-week-number')

class User {
    constructor(data) {
        this.id = data.id
        this.username = data.username
        this.email = data.email
        this.hash = data.hash // hash == hashed password
        // this.habits = data.habits
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
                let userData = await db.collection('users').find({ email: { $eq: email } }).toArray()
                let user = new User({ ...userData[0], id: userData[0]._id });
                resolve(user);
            } catch (err) {
                reject('User not found');
            }
        });
    }

    static create(name, email, hash) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let userData = await db.collection('users').insertOne({ username: name, email: email, hash: hash })
                let newUser = new User(userData); // .rows
                resolve(newUser);
            } catch (err) {
                reject('Error creating user');
            }
        });
    }

    get habits() {
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
    findHabitsForUser(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();

                const user = await db.collection('users').find({ email: { $eq: email } }).project({ email: 1, habits: 1 });

                const userHabits = { email: "", habits: {} } // object for response
                userHabits.email = user.email
                userHabits.habits = user.habits.map((a) => { return { habit_name: a.habit_name, frq: a.habit_frequency[a.habit_frequency.length - 1].frq } })

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

                resolve(userHabits);
            } catch (err) {
                reject("Users habits could not be found");
            };
        });
    };



    // --- get list of habits with frequencies and completed_count for week  by user's email
    findWeekDataTotal(email, week) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const user = await db.collection('users').find({ email: { $eq: email } }).project({ email: 1, habits: 1 });

                const WeekDataTotal = { email: "", habits: { habit_name: "", frq: "", habitCompletedCount: "" } } // object for response

                WeekDataTotal.email = user.email
                WeekDataTotal.habits = user.habits.map((a) => {
                    const habitFreq = a.habit_frequency[a.habit_frequency.length - 1].frq

                    // TODO add  count for current week for each habit

                    //= user.habits.habit_completed_days.map(currentWeekNumber)

                    return { habit_name: a.habit_name, frq: habitFreq }
                })


                /*  helpers for count for current week
                
                        function countCompletedOnWeek(arr,week) {
                           let count = 0
                           arr.forEach((v) => (v === week && count++))
                           return count
                        }
                         weekDataTotal.habits.count = countCompletedOnWeek(habitCompletedInWeeks,week)
                         
                 */
                resolve(WeekDataTotal);
            } catch (err) {
                reject("Data for this week could not be found");
            };
        });
    };
    // ---- for Habit page - single habit by habit_name, email, week number
    findWeekDataHabit(email, habit_name, week) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const user = await db.collection('users').find({ email: { $eq: email } }).project({ email: 1, habits: 1 });


                const weekDataForHabit = { email: "", habits: {} } // object for response
                weekDataForHabit.email = user.email
                weekDataForHabit.habits = user.habits.map((a) => { return { habit_name: a.habit_name, frq: a.habit_frequency[a.habit_frequency.length - 1].frq } })

                //  weekDataForHabit.days_completed = []

                resolve(WeekDataForHabit);
            } catch (err) {
                reject("Data for this week could not be found");
            };
        });
    };



}



module.exports = User;