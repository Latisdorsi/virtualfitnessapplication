// User Model
const url = require('url');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const config = require('../../config/keys');

module.exports = {

    registerUser: function (req, res, next) {
        const requestURL = url
            .parse(req.url)
            .pathname;
        const {
            active,
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
            active,
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
                    .json({ // Internal Error
                        error: err.message
                    })
            });
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
        const role = req.params.role

        User
            .find({ role })
            .exec((err, users) => {
                res.json(users)
            })
    },

    listInactiveUsers: function (req, res, next) {
        const role = 'member'
        const active = false;
        User
            .find({
                role,
                active
            })
            .exec((err, users) => {
                res.json(users)
            })
    },

    updateUser: function (req, res, next) {
        const _id = req.params.id
        const { firstName, lastName, email, password, role, active } = req.body

        User
            .findOne({ _id })
            .then(user => {
                user.name = {
                    firstName,
                    lastName
                }
                user.active = active
                user.email = email
                user.password = password
                user.role = role
                user.active = active
                user
                    .save()
                    .then(user => {
                        res.json(user)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })
            .catch(err => {
                console.error(err)
            })
    },

    updateUserAvatar: function (req, res, next) {
        const { avatarURL } = req.body
        User
            .update({
                _id: req.params.id
            },
                {
                    avatarURL
                }
            )
            .then(response => {
                res.json(response)
            })
            .catch(error => {
                console.error(error)
            })
    },

    deleteUserAvatar: function (req, res, next) {
        User
            .update({
                _id: req.params.id
            },
                {
                    avatarURL: ''
                }
            )
            .then(response => {
                res.json(response)
            })
            .catch(error => {
                console.error(error)
            })
    },

    updateUserContactDetails: function (req, res, next) {
        const {
            address,
            mobile,
            home,
            work,
        } = req.body

        let errors = []
        User
            .update({
                _id: req.params.id
            }, {
                    contactDetails: {
                        address,
                        phone: {
                            mobile,
                            home,
                            work
                        }
                    }
                })
            .then(response => {
                res.json(response)
            })
            .catch(error => {
                console.error(error)
            })
    },

    updateUserEmergencyDetails: function (req, res, next) {
        const {
            emergencyFullName,
            emergencyNumber,
            emergencyRelationship
        } = req.body
        User
            .update({
                _id: req.params.id
            }, {
                    emergencyDetails: {
                        fullName: emergencyFullName,
                        contactNumber: emergencyNumber,
                        relationship: emergencyRelationship
                    }
                })
            .then(response => {
                res.json(response)
            })
            .catch(error => {
                console.error(error)
            })
    },

    activateUser: function (req, res, next) {
        User
            .update({
                _id: req.params.id
            }, {
                    active: true
                })
            .then(
                res.status(200).json(true)
            )
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            })
    },

    deactivateUser: function (req, res, next) {
        User
            .update({
                _id: req.params.id
            }, {
                    active: false
                })
            .then(
                res.json(false)
            )
            .catch(err => {
                console.error(err)
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
    },

    authenticateUser: function (req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email }, function (err, user) {
            if (err) { // Internal Error
                res.status(500)
                    .json({
                        error: 'Oops! Internal error please try again'
                    });
            } else if (!user) { //User does not exist
                res.status(401)
                    .json({
                        error: 'User does not exist'
                    });
            } else { //Password is Incorrect
                //Get user id from call
                const { _id, active, first } = user
                user.comparePassword(password, function (err, same) {
                    if (err) {
                        res.status(500)
                            .json({ // Internal Error
                                error: 'Oops! Internal error please try again'
                            });
                    } else if (!same) {
                        res.status(401)
                            .json({
                                error: 'Incorrect email or password!'
                            });
                    } else {
                        // Issue token
                        const payload = { email, _id, active, first };
                        const token = jwt.sign(payload, config.SECRET, {
                            expiresIn: '2h'
                        });
                        res.cookie('token', token, { httpOnly: true })
                            .status(200).json({ token });

                    }
                });
            }
        })
    },

    checkUserToken: function (req, res, next) {
        res.json({
            email: req.email,
            _id: req._id
        });
    }

}