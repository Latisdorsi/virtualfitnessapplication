module.exports = {
    // Ensures uses is authenticated before displaying dashboard
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please log in before viewing dashboard')
        res.redirect('/');
    }
}