const mongoose = require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema

MeasurementSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
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
        category: { type: String },
        percentBodyFat: { type: Number },
        percentLeanMass: { Type: Number }
    }


})

const Measurement = new mongoose.model('Measurement', MeasurementSchema)
module.exports = Measurement