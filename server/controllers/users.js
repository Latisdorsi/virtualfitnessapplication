// User Model
const User = require('../models/user')
const url = require('url');

module.exports = {

    registerUser: function (req, res, next) {
        const requestURL = url.parse(req.url).pathname;
        const { name, email, password, password2, role } = req.body
        let errors = []
        //Validate Required Fields
        if (!firstName || !lastName || !email || !password || !password2 || !role) {
            errors.push({ msg: 'Please fill in all fields' });
            res.render('account/form', {
                errors,
                requestURL,
                firstName,
                lastName,
                email,
                password,
                password2
            })
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
                    res.redirect('/admin');
                })
                .catch(function (err) {
                    console.log(err)
                    res.render('account/form', {
                        errors,
                        requestURL,
                        firstName,
                        lastName,
                        email,
                        password,
                        password2
                    })
                });
            //}
        }
    },


    updateUser: function (req, res, next) {
        const _id = req.params.id
        const { firstName, lastName, email, password, role } = req.body

        User.findOne({ _id })
            .then(user => {
                user.name = {
                    firstName,
                    lastName
                }
                user.email = email
                user.password = password
                user.role = 'trainer'
                console.log(user)
                user.save()
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

    readUser: function (req, res, next) {
        const _id = req.params.id
        const requestURL = url.parse(req.url).pathname;

        User.findOne({ _id })
            .then(user => {
                const { name, email, password, role } = user
                const { firstName, lastName } = name
                const page = 'detail'
                res.render('account/form', {
                    requestURL,
                    firstName,
                    lastName,
                    email,
                    password,
                    role
                })
            })
            .catch((err) => res.send(err))
    },

    listUser: function (req, res, next) {
        const perPage = 9
        const page = req.params.page || 1
        const role = req.params.role

        User.find({ role })
            .exec((err, users) => {
                res.json(users)
            })
    },


    deleteUser: function (req, res, next) {
        const _id = req.params.id
        User.findOneAndRemove({
            _id
        })
            .then(user => {
                res.send('Deleted User')
            })
            .catch(err => {
                console.error(err)
            })
    }

}