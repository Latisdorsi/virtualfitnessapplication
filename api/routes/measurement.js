const express = require('express')
const router = express.Router()

// User Model
const Measurement = require('../../models/measurement')
const User = require('../../models/user')

// Get Latest Measurement
router.get('/measurement/:id', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'measurements',
            justOne: true,
            options: { sort: { date: -1 }, limit: 1 }
        })
        .then(user => {
            res.status(200).json(user.measurements)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})


router.get('/measurement/:id/weight', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'measurements',
            select: 'weight date -_id',
            options: { sort: { date: -1 } }
        })
        .then(user => {
            res.status(200).json(user.measurements)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})


router.get('/measurement/:id/neck', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'measurements',
            select: 'date neck -_id',
            options: { sort: { date: -1 } }
        })
        .then(user => {
            res.status(200).json(user.measurements)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})


router.get('/measurement/:id/waist', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'measurements',
            select: 'date waist -_id',
            options: { sort: { date: -1 } }
        })
        .then(user => {
            res.status(200).json(user.measurements)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

router.get('/measurement/:id/hips', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'measurements',
            select: 'date hips -_id',
            options: { sort: { date: -1 } }
        })
        .then(user => {
            res.status(200).json(user.measurements)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})


// Get All Member Measurement
router.get('/measurement/:id/all', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .sort({ '_id': -1 })
        .populate({
            path: 'measurements',
            select: '-bodyComposition -_id',
            options: { sort: { date: -1 } }
        })
        .then((user) => {
            res.status(200).json(user.measurements)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})


// Get Measurement Based on Date
router.get('/measurement/:id/query/:date', (req, res) => {
    const { id, date } = req.params
    Cycle.findOne({ User: req.params.id }).sort({ date: date }).limit(1)

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



// Add Measurement for Member
router.post('/measurement/:id', (req, res) => {
    const _id = req.params.id
    const { weight, neck, waist, hips, bodyComposition } = req.body
    const newMeasurement = new Measurement({
        user: _id,
        weight,
        neck,
        waist,
        hips,
        bodyComposition
    })

    newMeasurement.save()
        .then(measurement => {
            User.findOne({ _id })
                .then(user => {
                    user.measurements.push(measurement._id)
                    user.save().then(user => {
                        res.status(200).json(user)
                    })
                        .catch(error => {
                            res.status(500).json({
                                message: 'An error occured',
                                error: error
                            });
                        })
                    Î
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


// Delete Cycle
router.delete('/measurement/:id/:measurement', (req, res) => {
    const _id = req.params.id
    const _measurement = req.params.measurement
    User.findOne({ _id })

        .then(
            Measurement.findOneAndRemove({
                _measurement
            })
                .then(response => {
                    res.status(200).json('Measurement successfully deleted')
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        error: error
                    });
                })
        )
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})





module.exports = router