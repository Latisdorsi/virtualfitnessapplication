const express = require('express')
const router = express.Router()

// User Model
const Routine = require('../../models/routine')

// Get All Member Cycle
router.get('/routine', (req, res) => {
    Routine.find({})
        .exec()
        .then(routine => {
            res.status(200).json(routine)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Get Soecific Cycle
router.get('/routine/:id', (req, res) => {
    const _id = req.params.id
    Routine.find({ _id })
        .exec()
        .then(routine => {
            res.status(200).json(routine)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Query Routine
router.post('/routine/query', (req, res) => {
    const { level, goal, schedule } = req.body
    Routine.find({ level, goal, schedule })
        .exec()
        .then(routine => {
            res.status(200).json(routine)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
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
        .exec()
        .then(routine => {
            res.status(200).json(routine)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Update Routine
router.put('/routine/:id', (req, res) => {
    const _id = req.params.id
    const { level, goal, schedule, exercises } = req.body
    Routine.findOne({ _id })
        .exec()
        .then(routine => {
            routine.level = level
            routine.goal = goal
            routine.schedule = schedule
            routine.exercises = exercises
            routine.save()
                .then(routine => {
                    res.status(200).json(routine)
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        error: error
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Delete Routine
router.delete('/routine/:id', (req, res) => {
    const _id = req.params.id
    Routine.findOneAndRemove({
        _id
    })
        .then(routine => {
            res.status(200).json('Routine successfully deleted')
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

module.exports = router
