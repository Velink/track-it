const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./controllers/userRoutes')
server.use('/users', userRoutes)

// Root route
server.get('/', (req, res) => res.send('Hello, client!'))

module.exports = server