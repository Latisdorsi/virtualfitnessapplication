const mongoose = require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema
CycleSchema = new mongoose.Schema({
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    Routine: { type: Schema.Types.ObjectId, ref: 'Routine' },
    level: {
        type: Number,
        enum: [0,1,2,3,4]
    },
    goal:{
        type: Number,
        enum: [0,1,2,3]
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
    assessment: [{
        cardiovascular: { type: Number },
        upperMuscleStrength: { type: Number },
        lowerMuscleStrength: { type: Number },
        muscleEndurance: { type: Number },
        flexibility: { type: Number },
    }],

})

const Cycle = new mongoose.model('cycle', CycleSchema)
module.exports = Cycle