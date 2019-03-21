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

    type: {
        type: String,
        enum: ['core', 'cardio', 'exercises', 'flexibility']
    },

    rate: {
        cardio: { type: Number }, 
        core: { type: Number }, 
        flexibility: { type: Number }, 
        strength: { type: Number }, 
    },

    goal: {
        type: String
    }

})

const Exercise = mongoose.model('Exercise', ExerciseSchema)
module.exports = Exercise