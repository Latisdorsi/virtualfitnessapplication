const mongoose = require('mongoose')
const config = require('../config/secrect_keys')

mongoose.connect(config.MONGODB_URI || { useCreateIndex: true, useNewUrlParser: true });

module.exports = {
    User: require('../models/users.model')
}