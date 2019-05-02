const express = require('express')
const router = express.Router()

// User Model
const Record = require('../../models/record')

// Get Member Record
router.get('/record/:id', (req, res) => {
    const { date } = req.body
    Record.findOne({ User: req.params.id }).sort({ date: date }).limit(1)
        .exec((err, record) => {
            res.json(record)
        })
})

// Get All Member Cycle
router.get('/record/:id/all', (req, res) => {
    Record.find({ User: req.params.id })
        .exec((err, record) => {
            res.json(record)
        })
})

// Add Cycle For Member
router.post('/record/:id', (req, res) => {
    const User = req.params.id
    const { exercise, date, sets, oneRepMax, volume  } = req.body
    const newRecord = new Record({
        User,
        exercise,
        date,
        sets,
        oneRepMax,
        volume
    })

    newRecord.save()
        .then(record => {
            res.json(record)
        })
        .catch(error => {
            res.send(error)
        })
})

// Update cycle
router.put('/record/:id', (req, res) => {
    const { exercise, sets, oneRepMax, volume  } = req.body
    Record.findOne({ _id })
        .then(record => {
            record.exercise = exercise
            record.sets = sets
            record.oneRepMax = oneRepMax
            record.volume = volume
            record.save()
                .then(record => {
                    res.json(record)
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
router.delete('/record/:id', (req, res) => {
    const _id = req.params.id
    Record.findOneAndRemove({
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
