const express = require('express')
const router = express.Router()

// User Model
const Cycle = require('../../models/cycle')

// Get Latest Measurement
router.get('/measurement/:id', (req, res) => {
    Cycle.findOne({ User: req.params.id }).sort({ date: -1 }).limit(1)
        .exec((err, cycle) => {
            res.json(cycle)
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


// Get All Member Measurement
router.get('/measurement/:id/all', (req, res) => {
    Cycle.find({ User: req.params.id })
        .exec((err, cycle) => {
            res.json(cycle)
        })
})

// Add Measurement for Member
router.post('/measurement/:id', (req, res) => {
    const User = req.params.id
    const { date, weight, neck, waist, hips, bicep, forearm, bodyComp } = req.body
    const newMeasurement = new Measurement({
        User,
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
            res.json(measurement)
        })
        .catch(error => {
            res.send(error)
        })
})

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

// Delete Cycle
router.delete('/measurement/:id', (req, res) => {
    const _id = req.params.id
    Measurement.findOneAndRemove({
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
