const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter an exercise name']
    },
    
    videoURL: {
        type: String,
        required: [true, 'Please Enter a video URL']
    },

    category: {
        name:{
            type: String,
            enum: ['core', 'cardio', 'exercises', 'flexibility']
        },
        rate: Number
    },

    goal: {
        type: String
    }

})

const Exercise = mongoose.model('Exercise', ExerciseSchema)
module.exports = Exercise