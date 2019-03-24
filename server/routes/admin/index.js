const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('dashboard')
    /*
    if (req.user.role === 'admin' || req.user.role === 'manager') { res.render('dashboard', { user: req.user }) }
    else {
        req.flash('error_msg', 'Unauthorized account')
        res.redirect(401, '/')
    }*/
})

module.exports = router