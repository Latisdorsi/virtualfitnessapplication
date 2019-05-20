const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Exercise = require('./exercise')

RoutineSchema = new mongoose.Schema({
    level: {
        type: Number,
        enum: [0, 1, 2, 3, 4]
    },
    goal: {
        type: Number,
        enum: [0, 1, 2, 3]
    },
    schedule: {
        type: Number,
        enum: [0, 1, 2]
    },
    exercises: [{
        exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
        sets: { type: Number },
        day: { type: Number, enum: [0, 1, 2, 3, 4, 5] }
    }]
})

const Routine = new mongoose.model('Routine', RoutineSchema)
module.exports = Routine