const mongoose = require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema

RoutineSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
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
        exerciserID: { type: Schema.Types.ObjectId, ref: 'Exercise' },
        sets: {type: Number},
        day: {type: Number, enum: [0,1,2,3,4,5]}
    }]


})

const Routine = new mongoose.model('cycle', RoutineSchema)
module.exports = Routine