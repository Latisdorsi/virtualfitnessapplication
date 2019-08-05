const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const Exercise = require('../../models/schedule')
const Schedule = require('../../models/schedule')

router.get('/schedule/:id', (req, res) => {
    const _id = req.params.id
    Schedule.find({ user: _id, isActive: true })
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
    const start = new Date();
    const end = new Date();

    start.setHours(0, 0, 0, 0);
    end.setHours(24, 0, 0, 0);


    Schedule.findOne({
        "date": {
            "$gte": start.toISOString(),
            "$lt": end.toISOString()
        },
        user: _id,
        isActive: true
    })
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

router.put('/schedule/:id/complete/:schedule', (req, res) => {
    const _id = req.params.id;
    const schedule = req.params.schedule;
    Schedule.findOneAndUpdate({ _id: schedule, user: _id }, { $set: { isPending: false } })
    .then(schedule => {
        res.status(200).json(schedule)
    })
    .catch(error => {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error
        });
    })

});


router.put('/schedule/:id/deactivate/:cycle', (req, res) => {
    const _id = req.params.id;
    const cycle = req.params.cycle;

    Schedule.findOneAndUpdate({ cycle: cycle, user: _id }, { $set: { isActive: false } })
        .then(schedule => {
            res.status(200).json(schedule)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })
});

router.post('/schedule/:id', (req, res) => {
    const _id = req.params.id
    const { date, exercises, cycle } = req.body
    const newSchedule = new Schedule({
        user: _id,
        date,
        cycle,
        exercises,
        isActive: true, 
        isPending: true
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