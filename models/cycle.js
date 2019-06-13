const mongoose = require('mongoose')
const User = require('./user')
const Routine = require('./routine')

const Schema = mongoose.Schema
CycleSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    routine: { type: Schema.Types.ObjectId, ref: 'Routine' },
    level: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    goal: {
        type: Number,
        enum: [0, 1, 2, 3]
    },
    schedule: {
        type: Number,
        enum: [0, 1, 2]
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    targetDate: {
        type: Date,
        required: true
    },
    assessment: {
        // cardiovascular: { type: Number },
        upperBodyStrength: { 
            level: Number,
            oneRepMax: Number,
            weightRatio: Number
         },
        lowerBodyStrength: {
            level: Number,
            oneRepMax: Number,
            weightRatio: Number
        },
        muscleEndurance: { 
            level: Number,
            pushUpScore: Number
         },
        flexibility: {
            level: Number, 
            flexibilityScore: Number
         }
    },

})

const Cycle = new mongoose.model('Cycle', CycleSchema)
module.exports = Cycle