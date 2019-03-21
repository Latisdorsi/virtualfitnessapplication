const mongoose = require('mongoose')

CycleSchema = new mongoose.Schema({
    userid: {type: Schema.Types.ObjectId, ref: 'Person'},
    startDate:{
        type: Date,
        default: Date.now,
        required: true
    },

    targetDate:{
        type: Date,
        required: true
    },

    parameters:{
        date:{
            type: Date
       }, 
       stepTest: { type: Number },
       curlUpTest: { type: Number },
       pushUpTest: { type: Number },
       shoulderFlexibility: { type: Number }, 
       trunkExtension: { type: Number },
       sitAndReach: { type: Number },
    },
    
    measurement:{
        date: { type: Date, default: Date.now},
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
        weight:{ type: Number }
    },

    goal: { type: String },

    rate: {
        cardio: { type: Number }, 
        core: { type: Number }, 
        flexibility: { type: Number }, 
        strength: { type: Number }, 
    },
    
    scheduleId: [{type: Schema.Types.ObjectId, ref: 'Person'}]
})

const Cycle = new mongoose.model('cycle', CycleSchema)
module.exports = Cycle