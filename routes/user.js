var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = mongoose.model('User');

router.param('user', function (req, res, next, id) {
  User.findById(id).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('not found ' + id));
    }
    req.user = user;
    return next();
  });
});

router.get('/:user', function (req, res) {
  res.json(req.user);
});

router.post('/register', function (req, res, next) {
  if (!req.body.emailAddress || !req.body.password || !req.body.name) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new User();
  user.emailAddress = req.body.emailAddress;
  user.name = req.body.name;
  user.setPassword(req.body.password);
  user.save(function (err, post) {
    if (err) {
      return next(err);
    }
    return res.json({
      token: user.generateJWT(),
      user: post
    })
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.emailAddress || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  req.body.username = req.body.emailAddress;
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({
        token: user.generateJWT(),
        user: user
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/emailaddresstaken', function (req, res, next) {
  if (req.body.emailAddress) {
    User.find({username: req.body.emailAddress}, function (err, result) {
      if (result.length) {
        res.json({'username': 'taken'})
      } else {
        res.json({'username': 'ok'})
      }
    });
  }
});

module.exports = router;
