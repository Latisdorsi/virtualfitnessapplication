const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Exercise = require('./exercise')
const User = require('./user')
const Cycle = require('./cycle')

ScheduleSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cycle: { type: Schema.Types.ObjectId, ref: 'Cycle' },
    date: { type: Date },
    isActive: {type: Boolean, default: true, required: true},
    isPending: {type: Boolean, default: true, required: true},
    exercises: [{
        exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
        sets: { type: Number },
        day: { type: Number, enum: [0, 1, 2, 3, 4, 5] }
    }],

})

const Schedule = new mongoose.model('Schedule', ScheduleSchema)
module.exports = Schedule