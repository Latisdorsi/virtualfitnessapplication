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
            res.json(user.measurements)
        })
})

// Get All Member Measurement
router.get('/measurement/:id/all', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate('measurements')
        .exec((err, user) => {
            res.json(user.measurements)
        })
})


// Get Measurement Based on Date
router.get('/measurement/:id/query/:date', (req, res) => {
    const { id, date } = req.params
    Cycle.findOne({ User: req.params.id }).sort({ date: date }).limit(1)
        .exec((err, cycle) => {
            res.json(cycle)
        })
})



// Add Measurement for Member
router.post('/measurement/:id', (req, res) => {
    const _id = req.params.id
    const { date, weight, neck, waist, hips, bicep, forearm, bodyComp } = req.body
    const newMeasurement = new Measurement({
        User: _id,
        date,
        weight,
        neck,
        waist,
        hips,
        bicep,
        forearm,
        bodyComp
    })

    newMeasurement.save()
        .then(measurement => {
            User.findOne({ _id })
                .then(user => {
                    user.measurements.push(measurement._id)
                    user.save()
                    res.json(user)
                })
                .catch(err => {
                    //User does not push data
                })

        })
        .catch(error => {
            res.send(error)
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
                    res.send('Measurement successfully deleted')
                })
                .catch(err => {
                    console.error(err)
                })
        )
})

module.exports = router

/*
// Update cycle
router.put('/measurement/:id', (req, res) => {
    const _id = req.params.id
    const { date, weight, neck, waist, hips, bicep, forearm, bodyComp } = req.body
    Measurement.findOne({ _id })
        .then(measurement => {
            measurement.date = date
            measurement.weight = weight
            measurement.neck = neck
            measurement.waist = waist
            measurement.hips = hips
            measurment.bicep = bicep
            measurement.forearm = forearm
            measurement.bodyComp = bodyComp
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
*/