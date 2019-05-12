// Passport Middleware Includes
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// Secret Keys
const { secret } = require('./keys');

// Load User Model
const User = require('../models/user')

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });


    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'This email is not registered' });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password Incorrect' });
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret_key'
    }, function (jwtPayload, done) {
        console.log(jwtPayload)
        User.findOneById(jwtPayload.id)
            .then(user => {
                req.user = user
                done(null, user);
            })
            .catch(err => {
                done(null, false, { msg: err })
            })
    }))

}

