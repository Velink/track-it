const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class User {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.hash = data.hash
    }

    // may not need this
    static get all() {
        return new Promise (async (resolve, reject) => {
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

    
    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                //_id is actually an object, ObjectId(id)
                let userData = await db.collection('users').find({ _id: ObjectId(id) }).toArray()
                let user = new Dog({...userData[0], id: userData[0]._id});
                resolve (user);
            } catch (err) {
                reject('User not found');
            }
        });
    }

    static create(name, hash){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let userData = await db.collection('users').insertOne({ name, hash })
                let newUser = new Dog(userData.ops[0]); // .rows
                resolve (newUser);
            } catch (err) {
                reject('Error creating user');
            }
        });
    }

}

module.exports = User;