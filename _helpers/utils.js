module.exports = registerUser = (req, res, next) => {
    const { firstName, lastName, email, password, password2, role } = req.body
    let errors = []
    //Validate Required Fields
    if (!firstName || !lastName || !email || !password || !password2 || !role) {
        errors.push({ msg: 'Please fill in all fields' });
    }
    else {
        const newUser = new User({
            name: {
                firstName,
                lastName
            },
            email,
            password,
            role
        });

        // Save User to Database
        newUser.save()
            .then(user => {
                req.flash('success_msg', 'You are now registered')
                res.redirect('/users/login');
            })
            .catch(function (err) {
                console.log(err)
                res.render('register', {
                    errors,
                    firstName,
                    lastName,
                    email,
                    password,
                    password2
                })
            });
        //}
    }
}