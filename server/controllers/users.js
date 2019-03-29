// User Model
const User = require('../models/user')
const url = require('url');

module.exports = {

    registerUser: function (req, res, next) {
        const requestURL = url
            .parse(req.url)
            .pathname;
        const {
            firstName,
            lastName,
            middleInitial,
            email,
            password,
            role,
            address,
            mobile,
            home,
            work,
            emergencyFullName,
            emergencyNumber,
            emergencyRelationship

        } = req.body

        
        let errors = []
        //Validate Required Fields
        const newUser = new User({
            name: {
                firstName,
                lastName,
                middleInitial
            },
            email,
            password,
            role,
            contactDetails: {
                address,
                phone: {
                    mobile,
                    home,
                    work
                }
            },
            emegencyContact: {
                fullName: emergencyFullName,
                contactNumber: emergencyNumber,
                relationship: emergencyRelationship
            }
        });

        // Save User to Database
        newUser
            .save()
            .then(user => {
                res
                    .status(200)
                    .json(user)
            })
            .catch(function (err) {
                res
                    .status(500)
                    .json(err)
            });
    },
    
    updateUser: function (req, res, next) {
        const _id = req.params.id
        const { firstName, lastName, email, password, role } = req.body

        User
            .findOne({ _id })
            .then(user => {
                user.name = {
                    firstName,
                    lastName
                }
                user.email = email
                user.password = password
                user.role = role
                console.log(user)
                user
                    .save()
                    .then(user => {
                        res.json(user)
                    })
                    .catch(err => {
                        console.error('asdasdsa')
                    })
            })
            .catch(err => {
                console.error(err)
            })
    },

    readUser: function (req, res, next) {
        const _id = req.params.id
        User
            .findOne({ _id })
            .then(user => {
                res
                    .status(200)
                    .json(user)
            })
            .catch((err) => res.send(err))
    },

    listUser: function (req, res, next) {
        const perPage = 9
        const page = req.params.page || 1
        const role = req.params.role

        User
            .find({ role })
            .exec((err, users) => {
                res.json(users)
            })
    },

    deleteUser: function (req, res, next) {
        const _id = req.params.id
        User
            .findOneAndRemove({ _id })
            .then(user => {
                res.send('Deleted User')
            })
            .catch(err => {
                res.send(err)
            })
    }

}