const express = require('express')
const router = express.Router()
const exercise = require('../../controllers/exercises')

// Exercise Model
const Exercise = require('../../models/exercise')

router.get('/exercise/list/:page', (req, res) => {
    const perPage = 9
    const page = req.params.page || 1

    User.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, exercises) => {
            User.countDocuments({})
                .exec((err, count) => {
                    if (err) return next(err)
                    res.render('exercise/list', {
                        exercise: exercises,
                        current: page,
                        role: role,
                        pages: Math.ceil(count / perPage)
                    })
                })
        })
})

router.get('exercise/create', (req, res, next) => {
    res.render('exercise/form')
})

router.post('exercise/create', (req, res) => {
    const { name, videoURL, category, goal } = req.body
    let newExercise = new Exercise({
        name,
        videoURL,
        category,
        goal
    })

    exercise.save()
        .then(exercise => {
            res.json(exercise)
        })
        .catch(err => {
            console.error(err)
        })
})

router.get('/exercise/detail/:id', (req, res) => {
    const _id = req.params.id

    Exercise.findOne({ _id })
        .then(exercise => {
            const { name, email, password, role } = exercise
            res.render('account/form', {
                name,
                videoURL,
                category,
                goal
            })
        })
        .catch((err) => res.send(err))
})

router.put('/exercise/detail/:id', (req, res) => {
    const _id = req.params.id
    const { name, videoURL, category, goal } = req.body

    Exercise.findOne({ _id })
        .then(exercise => {
            exercise.name = name
            exercise.category = category
            exercise.videoURL = videoURL            
            exercse.goal = goal
            exercise.save()
                .then(user => {
                    res.json(user)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
})

router.post('/exercise/detail/:id', (req, res) => {
    const _id = req.params.id
    const { name, videoURL, category, goal } = req.body

    Exercise.findOne({ _id })
        .then(exercise => {
            exercise.name = name
            exercise.category = category
            exercise.videoURL = videoURL            
            exercse.goal = goal
            exercise.save()
                .then(user => {
                    res.json(user)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
})

router.delete('/exercise/detail/:id', (req, res) => {
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