const express = require('express')
const router = express.Router()
const user = require('../../controllers/users')

const url = require('url');
// const isAllowed = role => allowed.indexOf(role) > -1; User Model
const User = require('../../models/user')

// Get request for a list of user data and display them with pagination Route
// receives URL parameters role and page number Route outputs paginated list of
// data based on role
router.get('/list/:role/:page?', user.listUser)

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
    },{
        contactDetails: {
            address,
            phone: {
                mobile,
                home,
                work
            }
        }
    })
    .then(response =>{
        res.json(response)
    })
    .catch(error =>{
        console.error(error)
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
    },{
        emergencyContact: {
            fullName: emergencyFullName,
            contactNumber: emergencyNumber,
            relationship: emergencyRelationship
        }
    })
    .then(response =>{
        res.json(response)
    })
    .catch(error =>{
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

// Updates Account Data in the Database
router.put('/detail/:id', user.updateUser)
router.post('/detail/:id', user.updateUser)

// Deletes Account Data in the Database
router.delete('/detail/:id', user.deleteUser)
router.get('/delete/:id', user.deleteUser)

module.exports = router
