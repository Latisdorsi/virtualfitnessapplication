const express = require('express')
const router = express.Router()

// User Model
const Cycle = require('../models/cycle')
const Routine = require('../models/routine')
const User = require('../models/user')

// Get Latest Member Cycle
router.get('/cycle/:id', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'cycles',
            justOne: true,
            options: { sort: { startDate: -1 }, limit: 1 }
        })
        .exec((err, user) => {
            res.json(user.cycles)
        })
})

// Get Latest Member Cycle
router.get('/cycle/:id/routine', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'cycles',
            justOne: true,
            options: { sort: {startDate: -1 }, limit: 1 }
        })
        .then(user => {
            Routine.findOne({ _id: user.cycles.routine })
                .populate('exercises.exercise')
                .then(routine => {

                    res.json(routine)
                })
        })
})

// Get All Member Cycle
router.get('/cycle/:id/all', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate('cycles')
        .exec((err, user) => {
            res.json(user.cycles)
        })
})

// Add Cycle For Member
router.post('/cycle/:id', (req, res) => {
    const _id = req.params.id
    const { level, goal, schedule, startDate, targetDate, assessment } = req.body
    const newCycle = new Cycle({
        level,
        goal,
        schedule,
        startDate,
        targetDate,
        assessment
    })

    Routine.findOne({ level, goal, schedule })
        .then(routine => {
            newCycle.routine = routine._id
            newCycle.user = _id
            

            // Save New Cycle
            newCycle.save()
                .then(cycle => {
                    // Populate Cycle to User
                    User.findOne({ _id })
                        .then(user => {
                            user.cycles.push(cycle._id)
                            user.save().then(
                                res.json(user)
                            )

                        })
                        .catch(err => {
                            //User does not push data
                        })
                })

                .catch(error => {
                    res.send(error)
                })

        })
        .catch(err => {
            //Routine catched an error
        })
})

// Delete Cycle
router.delete('/cycle/:id/:cycle', (req, res) => {
    const _id = req.params.id
    const _cycle = req.params.cycle
    User.findOne({ _id })
        .then(
            Cycle.findOneAndRemove({
                _cycle
            })
                .then(response => {
                    res.send('Cycle successfully deleted')
                })
                .catch(err => {
                    console.error(err)
                })
        )
})

/*
// Update cycle
router.put('/cycle/:id', (req, res) => {
    const { Routine, level, goal, startDate, targetDate, assessment } = req.body
    Cycle.findOne({ _id })
        .then(cycle => {
            cycle.Routine = Routine
            cycle.level = level
            cycle.goal = goal
            cycle.startDate = startDate
            cycle.targetDate = targetDate
            cycle.assessment = assessment
            cycle.save()
                .then(cycle => {
                    res.json(cycle)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
})
*/



module.exports = router