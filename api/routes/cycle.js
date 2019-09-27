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

router.get('/cycle/:id/latest', (req, res) => {
    const _id = req.params.id;
    Cycle.findOne({ user: _id })
        .then(cycle => {
            res.status(200).json(cycle);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
});

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
        });
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
    const targetDate = Date.now() + 5184000000;

    const newCycle = new Cycle({
        level,
        goal,
        targetDate,
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
                            user.save().then(user => {
                                res.status(200).json(user)
                            })
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



router.get('/cycle/:id/end', (req, res) => {
    const _id = req.params.id
    const start = new Date();
    const end = new Date();

    start.setHours(0, 0, 0, 0);
    end.setHours(24, 0, 0, 0);


    Cycle.findOne({
        "targetDate": {
            "$gte": start.toISOString(),
            "$lt": end.toISOString()
        },
        user: _id,
        isActive: true
    })
        .then(cycle => {
            res.status(200).json(cycle)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

module.exports = router
