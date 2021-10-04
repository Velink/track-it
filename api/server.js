const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user');
const authenticateToken = require('./middleware/tokenAuth');
const path = require('path');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());




const userRoutes = require('./controllers/userRoutes')
// server.use('/user', userRoutes)

//Serve Client Folder to Localhost
server.use(express.static('../client'))

// Root route
server.get('/', (req, res) => res.send('Hello, client!'))

//login GET route
server.get('/login', async (req, res) => {
    let pathLogin = path.join(__dirname, '../client/login.html');
    res.sendFile(pathLogin);
})

//login route
server.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email) // finds unique username in database. we will add validation so that usernames are unique
        if (!user) { throw new Error('No user with this email') }
        const authed = await bcrypt.compare(req.body.password, user.hash);
        console.log(authed);
        if (authed) {
            const payload = { name: user.username, email: user.email }
            console.log(payload);
            const sendToken = (err, token) => {
                if (err) { throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            } //access token formed using payload+header
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, sendToken) // sendToken sends token to client side, stored in local storage
        } else {
            throw new Error('User could not be authenticated') //password incorrect
        }
    } catch (err) {
        res.status(401).json({ err });
    }
})

server.get('/user', authenticateToken, async (req, res) => { // after running authenticateToken, req.user is the user from server.post
    // once token verified, how do we proceed ?
    try {
        const user = await User.findByEmail(req.body.email)
        res.status(200).json(user);
    } catch (error) {
        res.status(404).send(error);
    }
})

// registration route
server.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const username = req.body.username;
        const email = req.body.email;
        const user = await User.create(username, email, hashed); //feeding in the unhashed password for checking if database stored value is correct (just need to replace with 'hashed' instead)
        res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ err });
    }
})

module.exports = server