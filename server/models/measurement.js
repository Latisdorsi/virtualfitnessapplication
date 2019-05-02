const mongoose = require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema
CycleSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    weight: { type: Number },
    neck: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
    bicep: { type: Number },
    forearm: { type: Number },
    thigh: { type: Number },
    calf: { type: Number },
    bodyComposition: {
        category: {
            type: String,
            enum: ['Poor', 'Below Average', 'Average', 'Above Average', 'Superior']
        },
        percentBodyFat: { type: Number },
        percentLeanMass: { Type: Number }
    }


})

const Cycle = new mongoose.model('cycle', CycleSchema)
module.exports = Cycle