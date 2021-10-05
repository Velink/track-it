const express = require('express');
const router = express.Router();

const User = require('../models/user')

// user index route

router.get('/', async (req, res) => {
    try {
        const users = await User.all
        res.json({ users })
    } catch (err) {
        res.status(500).json({ err })
    }
})

// user show route
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(404).json({ err })
    }
})

// Create User route
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body.name, req.body.hash) // returns new user
        res.json(user)
    } catch (err) {
        res.status(404).json({ err })
    }
})
/*
// get all habits for specific user route 
router.get('/:id/habits', async (req, res)=>{
    try {
        const habits = await User.habits(req.body.id);
        res.json(habits)
    } catch (err) {
        res.status(404).json({err})
    } 
})
*/

// add user habit router
router.post('/:id/habits', async (req, res) => {
    try {
        // form will have action to this page with input names "name", "frequency"
        const habits = await User.habits(req.body.id, req.body.name, req.body.frequency);
        res.json(habits)
    } catch (err) {
        res.status(404).json({ err })
    }
})

// update weekly count for habit
router.post('/:id/habits', async (req, res) => {
    try {
        const currentCount = await User.updateCount(req.params.id);
        res.send(currentCount)
    } catch (err) {
        res.status(404).json({ err })
    }
})

// update 



// findHabitsForUser
router.get('/:email/choose_habits', async (req, res) => {
    try {
        const allHabits = await User.findHabitsForUser(req.params.email)
        res.status(200).send(allHabits)
    } catch (err) {
        res.status(404).json({ err })
    }
})

// updateHabitsForUser
router.patch('/:username/choose_habits', async (req, res) => {
    try {
        const updatedHabits = await User.updateHabitsForUser(req.body.username)
        res.status(200).send(updatedHabits)
    } catch (err) {
        res.status(404).json({ err })
    }
})

router.get('/:username/dashboard/:week', async (req, res) => {
    try {
        const weekDataTotal = await User.findweekDataTotal(req.params.username, req.params.week)
        res.status(200).send(weekDataTotal)
    } catch (err) {
        res.status(404).json({ err })
    }
})

router.get('/:username/:habit/:week', async (req, res) => {
    try {
        const WeekDataHabit = await User.findWeekDataHabit(req.params.username, req.params.habit, req.params.week)
        res.status(200).send(WeekDataHabit)
    } catch (err) {
        res.status(404).json({ err })
    }
})

router.patch('/:username/:habit/:week', async (req, res) => {
    try {
        const newWeekDataHabit = await User.updateNewWeekDataHabit(req.params.username, req.params.habit, req.params.week)
        res.status(200).send(newWeekDataHabit)
    } catch (err) {
        res.status(404).json({ err })
    }
})

module.exports = router

