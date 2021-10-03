const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user');
const authenticateToken = require('./tokenAuth');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());


const userRoutes = require('./controllers/userRoutes')
server.use('/user', userRoutes)

// Root route
server.get('/', (req, res) => res.send('Hello, client!'))

//login route
server.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email) // finds unique username in database. we will add validation so that usernames are unique
        if(!user){ throw new Error('No user with this email') }
        const authed = bcrypt.compare(req.body.password, user.hash)
        if (authed){
            const user = {name: user.name, email: user.email, habits: user.habits}
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            } //access token formed using payload+header
            jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,  sendToken) // sendToken sends token to client side, stored in local storage
        } else {
            throw new Error('User could not be authenticated') //password incorrect
        }
    } catch (err) {
        res.status(401).json({err});
    }
})

server.get('/user', authenticateToken, async (req, res)=>{ // after running authenticateToken, req.user is the user from server.post
    // once token verified, how do we proceed ?
})

// registration route
server.post('/register', async (req, res) => { 
    try {
        const salt = await bcrypt.genSalt(); 
        const hashed = await bcrypt.hash(req.body.password, salt); 
        const username = req.body.username
        await User.create(username,hashed); //feeding in the unhashed password for checking if database stored value is correct (just need to replace with 'hashed' instead)
        res.status(201).json({msg: 'User created'});
    } catch (err) {
        res.status(500).json({err});
    }
})

module.exports = server