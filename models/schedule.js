const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Exercise = require('./exercise')
const User = require('./user')

ScheduleSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date },
    exercises: [{
        exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
        sets: { type: Number },
        day: { type: Number, enum: [0, 1, 2, 3, 4, 5] }
    }]
})

const Schedule = new mongoose.model('Schedule', ScheduleSchema)
module.exports = Schedule