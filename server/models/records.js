const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({
    Date: Date,
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    Exercise:{type: Schema.Types.ObjectId, ref: 'Exercise'},
    Sets: [{
        reps: {type: Number},
        weight: {type: Number}
    }],
    oneRepMax: {type: Number},
    volume: {type: Number}
})

const Record = mongoose.model('Record', RecordSchema)
module.exports = Record