const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator');
const Schema = mongoose.Schema

const Record = require('./record')
const Cycle = require('./cycle')

const UserSchema = new mongoose.Schema({
    avatarURL: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    first: {
        type: Boolean,
        default: true
    },
    name: {
        firstName: {
            type: String,
            required: [true, 'Please enter your first name.']
        },
        lastName: {
            type: String,
            required: [true, 'Please enter your last name.'],
            trim: true
        },
        middleInitial: {
            type: String
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: [true, 'This email already exists'],
        default: '',
        lowercase: true
    },
    password: {
        type: String,
        default: '',
        required: [true, 'Please enter your password.'],
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
    },
    role: {
        type: String,
        lowercase: true,
        enum: ['admin', 'manager', 'trainer', 'member'],
        required: [true, 'Please enter a role'],
        default: ['member'],
    },
    contactDetails: {
        address: String,
        phone: {
            mobile: Number,
            home: Number,
            work: Number
        }
    },
    emergencyDetails: {
        fullName: String,
        contactNumber: Number,
        relationship: String
    },
    cycles: [{ type: Schema.Types.ObjectId, ref: 'Cycle' }],
    records: [{ type: Schema.Types.ObjectId, ref: 'Record' }],
    measurements: [{ type: Schema.Types.ObjectId, ref: 'Measurement' }]
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                next();
            })
        })
    }
    // Call the next function in the pre-save chain
})

UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'BulkWriteError' || error.code === 11000) 
        next(new Error('The email you have selected already exists'));
    else next(error);
});


// User Contact Schema

// Updates Updated Data For New Items with the current Timestap Before Executing Save Function
UserSchema.pre('save', function (next) {
    let now = Date.now()

    this.updatedAt = now

    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
        this.createdAt = now
    }

    // Call the next function in the pre-save chain
    next();
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//Returns a Virtual Full Name
UserSchema.virtual('fullName')
    .get(function () {
        // "this" is an instance/document
        return `${this.firstName} ${this.lastName}`
    })

const User = mongoose.model('User', UserSchema)
module.exports = User