const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    avatarURL:{
        type: String
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
            type:String,
            required: [true, 'Please enter your middle initial.']
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: [true, 'This email already exists'],
        default: '',
        lowercase: true,
        validate: function (email) { validator.isEmail(email) }
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
    emergencyContact: {
        fullName: String,
        contactNumber: Number,
        relationship: String
    }

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
    next()
})

// Validate if Email Already Exists in the Database
// Prevents duplicate accounts from being made
UserSchema.path('email').validate(function (email) {
    this.model('User').count({ email })
        .then(count => {
            return !count
        })
        .catch(err => {
            console.error(err)
            return false;
        })
}, 'Email');

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