const express = require('express')
const router = express.Router()
//const exercise = require('../../controllers/exercises')

// Exercise Model
const Exercise = require('../models/exercise')

router.get('/list', (req, res) => {
    Exercise.find({})
        .then((exercises) => {
            res.json(exercises)
        }, () => {
            res.status(500).json({ message: 'Oops! An internal error occured'})
        })
        .catch(err => {
            res.status(500).json({
                message: 'Oops! An internal error occured. Please try again'
            })
        })
})

router.get('/names', (req, res) => {
    Exercise.find({}).select('name')
        .exec((err, exercises) => {
            res.json(exercises)
        })
})

router.post('/create', (req, res) => {
    const { imageName, imageUrl, name, instruction } = req.body
    let newExercise = new Exercise({
        imageName,
        imageUrl,
        name,
        instruction

    })

    newExercise.save()
        .then(exercise => {
            res.json(exercise)
        })
        .catch(err => {
            res.status(500).send({ error: err })
        })
})



router.get('/detail/:id', (req, res) => {
    const _id = req.params.id

    Exercise.findOne({ _id })
        .then(exercise => {
            res.json(exercise)
        })
        .catch((err) => res.send(err))
})

router.put('/detail/:id', (req, res) => {
    const _id = req.params.id
    const { imageName, imageUrl, name, instruction } = req.body
    Exercise.findOne({ _id })
        .then(exercise => {
            exercise.imageName = imageName
            exercise.imageUrl = imageUrl
            exercise.name = name
            exercise.instruction = instruction
            exercise.save()
                .then(exercise => {
                    res.json(exercise)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
})

//Update User Avatar
router.put('/detail/:id/image', (req, res, next) => {
    const { avatarURL } = req.body
    User
        .update({
            _id: req.params.id
        },
            {
                avatarURL
            }
        )
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            console.error(error)
        })
})


router.delete('/detail/:id', (req, res) => {
    const _id = req.params.id
    Exercise.findOneAndRemove({
        _id
    })
        .then(exercise => {
            res.send('Deleted User')
        })
        .catch(err => {
            console.error(err)
        })
})

module.exports = router