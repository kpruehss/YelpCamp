const express = require('express');
const passport = require('passport');
const User = require('../models/user');
let router = express.Router(); // eslint-disable-line new-cap

// ==========
// APP ROUTES
// ==========
router.get('/', (req, res) => {
  res.render('landing');
});

// ===========
// AUTH ROUTES
// ===========
router.get('/register', (req, res) => {
  res.render('register');
});

// handle sign up logix
router.post('/register', (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

// show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// handle login logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
  }),
  (req, res) => {}
);

// logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});

module.exports = router;
