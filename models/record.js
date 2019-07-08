const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
    sets: [{
        rep: { type: Number },
        weight: { type: Number }
    }],
    oneRepMax: { type: Number },
    volume: { type: Number }
})

const Record = mongoose.model('Record', RecordSchema);
module.exports = Record;