const express = require('express')
const router = express.Router()
//const exercise = require('../../controllers/exercises')

// Exercise Model
const Exercise = require('../../models/exercise')

router.get('/list', (req, res) => {
    Exercise.find({})
        .exec( (err, exercises) => {
            res.json(exercises)
        })
})


router.post('/create', (req, res) => {
    const { name, videoURL, category, goal } = req.body
    let newExercise = new Exercise({
        name,
        videoURL,
        category,
        goal
    })

    newExercise.save()
        .then(exercise => {
            res.json(exercise)
        })
        .catch(err => {
            res.status(500).send({ error: err})
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
    const { name, videoURL, category, goal } = req.body

    Exercise.findOne({ _id })
        .then(exercise => {
            exercise.name = name
            exercise.category = category
            exercise.videoURL = videoURL
            exercise.goal = goal
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