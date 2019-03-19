const express = require('express')
const router = express.Router()

const passport = require('passport')
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('login')
})

// Login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'User has been successfully logged out')
    res.redirect('/users/login')
})

module.exports = router


