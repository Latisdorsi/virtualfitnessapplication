
// Exercise Model
const Exercise = require('../../models/exercise');

module.exports = {
    createExercise: function (req, res, next) {
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
    },
    listExercises: function (req, res, next) {
        Exercise.find({})
            .then((exercises) => {
                res.json(exercises)
            }, () => {
                res.status(500).json({ message: 'Oops! An internal error occured' })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Oops! An internal error occured. Please try again'
                })
            })
    },
    listExerciseNames: function (req, res, next) {
        Exercise.find({}).select('name')
            .exec((err, exercises) => {
                res.json(exercises)
            })
    },
    readExercises: function (req, res, next) {
        const _id = req.params.id

        Exercise.findOne({ _id })
            .then(exercise => {
                res.json(exercise)
            })
            .catch((err) => res.send(err))
    },
    updateExercise: function (req, res, next) {
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
    },
    updateExerciseImage: function (req, res, next) {
        const { imageUrl } = req.body
        User
            .update({
                _id: req.params.id
            },
                {
                    imageUrl
                }
            )
            .then(response => {
                res.json(response)
            })
            .catch(error => {
                console.error(error)
            })
    },
    deleteExercise: function (req, res, next) {
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
    }

}
