const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({
    Date: Date,
    User: {type: Schema.Types.ObjectId, ref: 'User'},
    Exercise:{type: Schema.Types.ObjectId, ref: 'Exercise'},
    Intensity: Number,
    Duration: Number
})

const Record = mongoose.model('Record', RecordSchema)
module.exports = Record