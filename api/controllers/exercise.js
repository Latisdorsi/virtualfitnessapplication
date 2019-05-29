
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
                res.status(200).json(exercise);
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                });
            })
    },
    listExercises: function (req, res, next) {
        Exercise
            .find({})
            .sort({ createdDate: -1 })
            .exec()
            .then((exercises) => {
                res.status(200).json(exercises);
            }, () => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                });
            })
    },
    listExerciseNames: function (req, res, next) {
        Exercise.find({}).select('name').exec()
            .then(exercise => {
                res.status(200).json(exercises)
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                })
            })

    },
    readExercises: function (req, res, next) {
        const _id = req.params.id

        Exercise.findOne({ _id })
            .sort({ createdDate: -1 })
            .exec()
            .then(exercise => {
                res.status(200).json(exercise);
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                });
            })
    },
    updateExercise: function (req, res, next) {
        const _id = req.params.id
        const { imageName, imageUrl, name, instruction } = req.body
        Exercise.findOne({ _id }).exec()
            .then(exercise => {
                exercise.imageName = imageName
                exercise.imageUrl = imageUrl
                exercise.name = name
                exercise.instruction = instruction
                exercise.save()
                    .then(exercise => {
                        res.status(200).json(exercise);
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
            ).exec()
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                });
            })
    },
    deleteExercise: function (req, res, next) {
        const _id = req.params.id
        Exercise.findOneAndRemove({
            _id
        }).exec()
            .then(exercise => {
                res.status(200).json('Deleted User');
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                });
            })
    }

}
