const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user');
const authenticateToken = require('./middleware/tokenAuth');
const path = require('path');
const joi = require('joi')

require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());

// SET UP VIEW ENGINE
server.set("view engine", 'ejs');


const userRoutes = require('./controllers/userRoutes')
server.use('/user', userRoutes)

//Serve Client Folder to Localhost
server.use(express.static('../client'))

// Root route
server.get('/', (req, res) => {
    let pathLogin = path.join(__dirname, '../client/html/login.html');
    res.sendFile(pathLogin);
})

//login GET route
server.get('/login', async (req, res) => {
    let pathLogin = path.join(__dirname, '../client/html/login.html');
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

server.get('/user', async (req, res) => { // after running authenticateToken, req.user is the user from server.post
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
        const data = req.body;

        const schema = joi.object({
            username: joi.string().min(8).required(),
            email: joi.string().email().required(),
            password: joi.string().min(7).required(),
            passwordcon: joi.string().valid(joi.ref('password')).required()
        })

        const result = schema.validate(data)
        console.log(result)
        if (result.error) {
            // console.log(result.error.details[0].message)
            return res.send(result)
        }
        // console.log(req.body)
        // console.log(req.body.username)
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const username = req.body.username;
        const email = req.body.email;
        // console.log(hashed)
        // const habits = req.body.habits;
        const user = await User.create(username, email, hashed);
        // console.log(user)
        return res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ err });
    }
})

module.exports = server