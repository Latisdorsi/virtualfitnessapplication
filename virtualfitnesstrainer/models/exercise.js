const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    imageName:{
        type: String
    },
    imageUrl:{
        type: String
    },
    name: {
        type: String,
        required: [true, 'Please enter an exercise name']
    },
    
    instruction: {
        type: String,
        required: [true, 'Please enter the exercise instruction']
    }
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)
module.exports = Exercise