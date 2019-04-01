const mongoose = require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema
CycleSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },

    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    targetDate: {
        type: Date,
        required: true
    },
    targetGoal: { type: String, required:true },

    parameters: [{
        date: { type: Date },
        stepTest: { type: Number },
        curlUpTest: { type: Number },
        pushUpTest: { type: Number },
        shoulderFlexibility: { type: Number },
        trunkExtension: { type: Number },
        sitAndReach: { type: Number },
        rate: {
            cardio: { type: Number },
            core: { type: Number },
            flexibility: { type: Number },
            strength: { type: Number },
        }
    }],

    measurement: [{
        date: { type: Date, default: Date.now },
        waist: { type: Number },
        hips: { type: Number },
        lBicep: { type: Number },
        rBicep: { type: Number },
        lForearm: { type: Number },
        rForearm: { type: Number },
        lThigh: { type: Number },
        rThigh: { type: Number },
        lCalf: { type: Number },
        rCalf: { type: Number },
        weight: { type: Number }
    }],
    

    scheduleId: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
})

const Cycle = new mongoose.model('cycle', CycleSchema)
module.exports = Cycle