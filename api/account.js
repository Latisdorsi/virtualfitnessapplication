const express = require('express')
const router = express.Router()
const user = require('../controllers/users')
const jwt = require('jsonwebtoken');
const auth = require('../config/auth')
const config = require('../config/keys')
const url = require('url');
// const isAllowed = role => allowed.indexOf(role) > -1; User Model
const User = require('../models/user')

// Get request for a list of user data and display them with pagination Route
// receives URL parameters role and page number Route outputs paginated list of
// data based on role
router.get('/list/:role', user.listUser)

router.get('/list/member/inactive', (req, res, next) =>{
        const role = req.params.role;
        const active = false;
        User
            .find({ 
                role,
                active
             })
            .exec((err, users) => {
                res.json(users)
            })

})

// Get Request for Account Creation Form Renders Registration Page
router.get('/create', (req, res) => {
    const requestURL = url
        .parse(req.url)
        .pathname
        .toString()
    res.render('account/form', { requestURL })
})

// Post Request for Account Creation Form Creates New User Account
router.post('/create', user.registerUser)

// Returns view for account with specific ID
router.get('/detail/:id', user.readUser)

//Update User Avatar
router.put('/detail/:id/avatar', (req, res, next) => {
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
})

router.put('/detail/:id/contact', (req, res, next) => {
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
})

// Change User Activation
router.put('/activate/:id', (req, res) => {
    let errors = []
    User
        .update({
            _id: req.params.id
        }, {
                active: true
            })
        .then(response => {
            res.json(true)

        })
        .catch(err => {
            console.error(err)
        })
})

// Change User Activation
router.put('/deactivate/:id', (req, res) => {
    let errors = []
    User
        .update({
            _id: req.params.id
        }, {
                active: false
            })
        .then(response => {
            res.json(false)

        })
        .catch(err => {
            console.error(err)
        })
})

router.put('/detail/:id/emergency', (req, res, next) => {
    const {
        emergencyFullName,
        emergencyNumber,
        emergencyRelationship
    } = req.body
    let errors = []
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
})

//Update User Avatar
router.delete('/detail/:id/avatar', (req, res, next) => {
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
})


router.get('/authenticate', function (req, res) {
    res.status(200).json({message:'all good'})
})

router.post('/authenticate', function (req, res) {
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
    });
});


router.get('/checkToken', auth, function (req, res) {
    res.json({
        email: req.email,
        _id: req._id
    });
})



// Updates Account Data in the Database
router.put('/detail/:id', user.updateUser)
router.post('/detail/:id', user.updateUser)

// Deletes Account Data in the Database
router.delete('/detail/:id', user.deleteUser)
router.get('/delete/:id', user.deleteUser)

module.exports = router
