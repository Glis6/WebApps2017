var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
    function (emailAddress, password, done) {
        User.findOne({ emailAddress: emailAddress }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect e-mail address.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }));
