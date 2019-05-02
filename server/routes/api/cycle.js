const express = require('express')
const router = express.Router()

// User Model
const Cycle = require('../../models/cycle')

// Get Latest Member Cycle
router.get('/cycle/:id', (req, res) => {
    Cycle.findOne({ User: req.params.id }).sort({ date: -1 }).limit(1)
        .exec((err, cycle) => {
            res.json(cycle)
        })
})

// Get All Member Cycle
router.get('/cycle/:id/all', (req, res) => {
    Cycle.find({ User: req.params.id })
        .exec((err, cycle) => {
            res.json(cycle)
        })
})

// Add Cycle For Member
router.post('/cycles/:id', (req, res) => {
    const User = req.params.id
    const { Routine, level, goal, startDate, targetDate, assessment } = req.body
    const newCycle = new Cycle({
        User,
        Routine,
        level,
        goal,
        startDate,
        targetDate,
        assessment
    })

    newCycle.save()
        .then(cycle => {
            res.json(cycle)
        })
        .catch(error => {
            res.send(error)
        })
})

// Update cycle
router.put('/cycle/:id', (req, res) => {
    const { Routine, level, goal, startDate, targetDate, assessment } = req.body
    measurement.findOne({ _id })
        .then(measurement => {
            measurement.Routine = Routine
            measurement.level = level
            measurement.goal = goal
            measurement.startDate = startDate
            measurement.targetDate = targetDate
            measurement.assessment = assessment
            measurement.save()
                .then(measurement => {
                    res.json(measurement)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
})

// Delete Cycle
router.delete('/cycle/:id', (req, res) => {
    const _id = req.params.id
    Cycle.findOneAndRemove({
        _id
    })
        .then(response => {
            res.send('Deleted User')
        })
        .catch(err => {
            console.error(err)
        })
})

module.exports = router
