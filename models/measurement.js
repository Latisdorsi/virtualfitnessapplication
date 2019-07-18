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
    bodyComposition: {
        category: { type: String },
        percentBodyFat: { type: Number },
        percentLeanMass: { type: Number }
    }
})

const Measurement = new mongoose.model('Measurement', MeasurementSchema)
module.exports = Measurement