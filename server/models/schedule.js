const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    Date: Date,
    User: {type: Schema.Types.ObjectId, ref: 'User'},
    Exercise:[{type: Schema.Types.ObjectId, ref: 'Exercise'}],
})