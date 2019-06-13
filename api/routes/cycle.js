const express = require('express')
const router = express.Router()

// User Model
const Cycle = require('../../models/cycle')
const Routine = require('../../models/routine')
const User = require('../../models/user')

// Get Latest Member Cycle
router.get('/cycle/:id', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'cycles',
            justOne: true,
            options: { sort: { startDate: -1 }, limit: 1 }
        })
        
        .then(user => {
            res.status(200).json(user.cycles)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Get Member Routine
router.get('/cycle/:id/routine', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'cycles',
            justOne: true,
            options: { sort: { startDate: -1 }, limit: 1 }
        })
        .then(user => {
            Routine.findOne({ _id: user.cycles.routine })
                .populate('exercises.exercise')
                .then(routine => {
                    res.status(200).json(routine)
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Get All Member Cycle
router.get('/cycle/:id/all', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate('cycles')
        .then(user => {
            res.status(200).json(user.cycles)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Add Cycle For Member
router.post('/cycle/:id', (req, res) => {
    const _id = req.params.id;
    const { level, goal, schedule, assessment } = req.body;
    const startDate = Date.now();
    const targetDate = Date.now() + 5184000000;

    const newCycle = new Cycle({
        level,
        goal,
        schedule,
        assessment
    })

    Routine.findOne({ level, goal, schedule })
        .then(routine => {
            newCycle.routine = routine._id;
            newCycle.user = _id;
            // Save New Cycle
            newCycle.save()
                .then(cycle => {
                    // Populate Cycle to User
                    User.findOne({ _id })
                        .then(user => {
                            user.cycles.push(cycle._id);
                            user.save().then(
                                res.status(200).json(user)
                            )
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: 'Internal Server Error',
                                error: error.message
                            });
                        })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        error: error.message
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
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
                    res.status(200).json('Cycle successfully deleted');
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        error: error
                    });
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
