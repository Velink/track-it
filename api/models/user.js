const { init } = require('../dbConfig/init')
const { ObjectId } = require('mongodb')

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
                // !! TODO: add an agregation by latest habits.freq_setup_date
                const user = await db.collection('users').find({ email: { $eq: email } }).project({ email: 1, habits: 1 }); //mongo stores id as object
                // const userHabits = user.habits; // user['habits'] should be stored in db as array we can push objects to
                resolve(userHabits);
            } catch (err) {
                reject("Users habits could not be found");
            };
        });
    };

    /*   --- agreed on not keeping a count
        static updateCount(userId){
            return new Promise (async (resolve, reject) => {
                try {
                    const db = await init();
                    const user = await db.collections('users').find({ _id: ObjectId(userId) })[0]; // the zero indexing is what made it possible to extract key value in terminal. might not need it
                    const currentCount = user["habits"]["count"]; //key value must be string in indexing. count property is in habits
                    currentCount++
                    db.collection('users').updateOne({ _id: ObjectId(userId) }, { $set: { "count": currentCount } }) //update count in database
                    resolve(currentCount); //check if updates have been made
                } catch (err) {
                    reject('Error creating user');
                }
            });
        }
      */



}



module.exports = User;