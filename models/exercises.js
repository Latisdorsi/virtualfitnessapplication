const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter an exercise name']
    },
    videoURL:{
        type: String,
        required: [true, 'Please Enter a video URL']
    },
    type:{
        type: String,
        enum: ['core', 'cardio', 'exercises', 'flexibility']
    },
    rate:{
        type: Number,
        default: 0
    },
    goal:{
        type: String
    }

})