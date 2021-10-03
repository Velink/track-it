const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user')

// user index route
router.get('/', async (req, res) => {
    try {
        const users = await User.all
        res.json({users})
    } catch(err) {
        res.status(500).json({err})
    }
})

// user show route
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Create User route
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body.name, req.body.hash) // returns new user
        res.json(user)
    } catch(err) {
        res.status(404).json({err})
    }
})

// get all habits for specific user route 
router.get('/:id/habits', async (req, res)=>{
    try {
        const habits = await User.habits(req.body.id);
    } catch (err) {
        res.status(404).json({err})
    } 
})

// add user habit router
router.post('/:id/habits', async (req, res)=>{
    try {
        // form will have action to this page with input names "name", "frequency"
        const habits = await User.habits(req.body.id, req.body.name, req.body.frequency);
        res.json(habits)
    } catch (err) {
        res.status(404).json({err})
    } 
})

// update weekly count for habit
router.post('/:id/habits', async (req, res)=>{
    try {
        const currentCount = await User.updateCount(req.params.id);
        res.send(currentCount)  
    } catch (err) {
        res.status(404).json({err})
    }
})

// update 

module.exports = router

