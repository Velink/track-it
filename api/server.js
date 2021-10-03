const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('./models/user')

const server = express();
server.use(cors());
server.use(express.json());


const userRoutes = require('./controllers/userRoutes')
server.use('/users', userRoutes)

// Root route
server.get('/', (req, res) => res.send('Hello, client!'))

// registration route
server.post('/register', async (req, res) => { 
    try {
        console.log(req.body.password)
        const salt = await bcrypt.genSalt(); 
        const hashed = await bcrypt.hash(req.body.password, salt); 
        const username = req.body.username
        password = req.body.password
        console.log(username)
        console.log(req.body.password)
        console.log(hashed)
        await User.create(username,password); //feeding in the unhashed password for checking if database stored value is correct (just need to replace with 'hashed' instead)
        res.status(201).json({msg: 'User created'});
    } catch (err) {
        res.status(500).json({err});
    }
})

module.exports = server