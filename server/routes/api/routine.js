const express = require('express')
const router = express.Router()

// User Model
const Routine = require('../../models/routine')

// Get All Member Cycle
router.get('/routine', (req, res) => {
    Routine.find({})
        .exec((err, routine) => {
            res.json(routine)
        })
})

// Get Specific Routine
router.post('/routine/query', (req, res) => {
    const { level, goal, schedule } = req.body
    Routine.find({ level, goal, schedule })
        .exec((err, routine) => {
            res.json(routine)
        })
})

// New Routine Form Template
router.post('/routine', (req, res) => {
    const { level, goal, schedule, exercises } = req.body
    const newRoutine = new Routine({
        level,
        goal,
        schedule,
        exercises
    })

    newRoutine.save()
        .then(routine => {
            res.json(routine)
        })
        .catch(error => {
            res.send(error)
        })
})

// Update Routine
router.put('/routine/:id', (req, res) => {
    const _id = req.params.id
    const { level, goal, schedule, exercises } = req.body
    Exercise.findOne({ _id })
        .then(routine => {
            routine.level = level
            routine.goal = goal
            routine.schedule = schedule
            routine.exercises = exercises
            routine.save()
                .then(routine => {
                    res.json(routine)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
})

// Delete Routine
router.delete('/routine/:id', (req, res) => {
    const _id = req.params.id
    Routine.findOneAndRemove({
        _id
    })
        .then(routine => {
            res.send('Deleted User')
        })
        .catch(err => {
            console.error(err)
        })
})

module.exports = router
