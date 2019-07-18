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

router.get('/records/:exercise/:user', (req, res) => {
    const user = req.params.user;
    const exercise = req.params.exercise;

    Record.find({ exercise, user })
        .then(record => {
            res.status(200).json(record);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        })

})


router.get('/records/:exercise/:user/record', (req, res) => {
    const user = req.params.user;
    const exercise = req.params.exercise;

    Record.findOne({ exercise, user })
        .sort('-volume, -oneRepMax')
        .then(record => {
            res.status(200).json({
                volume: record.volume,
                oneRepMax: record.oneRepMax
            });
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
    const { id, sets, oneRepMax, volume } = req.body
    const newRecord = new Record({
        user: _id,
        exercise: id,
        sets,
        oneRepMax,
        volume
    })

    newRecord.save()
        .then(record => {
            User.findOne({ _id })
                .then(user => {
                    user.records.push(record._id)
                    user.save().then(
                        res.status(200).json(user)
                    );
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
});


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
});

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