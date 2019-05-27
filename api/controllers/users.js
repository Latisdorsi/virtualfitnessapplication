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
            .catch(function (error) {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
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
            .catch((error) => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                })
            });
    },

    listUser: function (req, res, next) {
        const role = req.params.role

        User
            .find({ role })
            .exec()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                })
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
            .exec()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                })
            })
    },

    updateUser: function (req, res, next) {
        const _id = req.params.id
        const { firstName, lastName, email, password, role, active } = req.body

        User
            .findOne({ _id })
            .exec()
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
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                })
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
            .exec()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                })
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
            .exec()
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                })
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
            .exec()
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                });
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
            .exec()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                })
            })
    },

    activateUser: function (req, res, next) {
        User
            .update({
                _id: req.params.id
            }, {
                    active: true
                })
            .exec()
            .then(
                res.status(200).json(true)
            )
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
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
            .exec()
            .then(
                res.status(200).json(false)
            )
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Errror',
                    error: error
                })
            })
    },

    deleteUser: function (req, res, next) {
        const _id = req.params.id
        User
            .findOneAndRemove({ _id })
            .exec()
            .then(user => {
                res.send('Deleted User')
            })
            .catch(err => {
                res.send(err)
            })
    },

    authenticateUser: function (req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email }).exec()
            .then(user => {
                if (!user) { //User does not exist
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
            .catch(err => {
                res.status(500)
                    .json({
                        error: 'Oops! Internal error please try again'
                    });
            })
    },

    checkUserToken: function (req, res, next) {
        res.json({
            email: req.email,
            _id: req._id
        });
    }

}