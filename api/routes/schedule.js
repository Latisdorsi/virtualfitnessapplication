const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const Exercise = require('../../models/schedule')
const Schedule = require('../../models/schedule')

router.get('/schedule/:id', (req, res) => {
    const _id = req.params.id
    Schedule.find({ user: _id })
        .then(schedule => {
            res.status(200).json(schedule)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

router.get('/schedule/:id/now', (req, res) => {
    const _id = req.params.id
    Schedule.findOne({ user: _id, date: new Date().toISOString() })
        .then(schedule => {
            res.status(200).json(schedule)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
})

router.post('/schedule/:id', (req, res) => {
    const _id = req.params.id
    const { date, exercises } = req.body
    const newSchedule = new Schedule({
        user: _id,
        date,
        exercises
    })   
    // res.json(newSchedule);
    newSchedule.save()
        .then(schedule => {
            res.status(200).json(schedule);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


module.exports = router