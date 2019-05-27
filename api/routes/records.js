const express = require('express')
const router = express.Router()

// User Model
const Record = require('../../models/record')
const User = require('../../models/user')

// Get Latest Member Record
router.get('/record/:id', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate({
            path: 'records',
            justOne: true,
            options: { sort: { date: -1 }, limit: 1 }
        })
        .exec()
        .then(user => {
            res.status(200).json(user.records)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Get All Member Records
router.get('/record/:id/all', (req, res) => {
    const _id = req.params.id
    User.findOne({ _id })
        .populate('records')
        .exec()
        .then(user => {
            res.status(200).json(user.records)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

// Add Records For Member
router.post('/record/:id', (req, res) => {
    const _id = req.params.id
    const { exercise, date, sets, oneRepMax, volume } = req.body
    const newRecord = new Record({
        user: _id,
        exercise,
        date,
        sets,
        oneRepMax,
        volume
    })

    newRecord.save()
        .exec()
        .then(record => {
            User.findOne({ _id })
                .then(user => {
                    user.records.push(record._id)
                    user.save().then(
                        res.status(200).json(user)
                    )
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


// Delete Record
router.delete('/record/:id', (req, res) => {
    const _id = req.params.id
    Record.findOneAndRemove({
        _id
    })
        .then(response => {
            res.status(200).send('Deleted User')
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

module.exports = router

/*
// Update Records
router.put('/record/:id', (req, res) => {
    const { exercise, sets, oneRepMax, volume } = req.body
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
*/