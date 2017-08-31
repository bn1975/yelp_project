const router = require('express').Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../db');

//ROUTE:  Homepage
router.get('/', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/home');
});

//ROUTE:  Homepage
router.get('/home', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/home');
});

//ROUTE:  About
router.get('/about', function (req, res) {
  // Send login.ejs file to the client
  res.render('site/about');
});


//ROUTE:  Sign-up
router.get('/signup', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/signup');
});

//ROUTE:  Login
router.get('/login', function (req, res) {
  // Send login.ejs file to the client
  res.render('site/login');
});


//AUTHENTICATE
router.post('/login', function (req, res) {
  knex('users')
    .where({email: req.body.email})
    .first()
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      bcrypt.compare(req.body.password, user.hashed_password)
        .then(function () {
          res.render('site/profile');

        })
        .catch(function () {
          res.sendStatus(401);
        })
    })
    .catch(function () {
      res.redirect('/login');
    })

});

//REQUIRE AUTH?
//ROUTE:  Profile
router.get('/profile', function (req, res) {
  // Send profile.ejs file to the client
  if (req.session.user_id) { // CHECK IF LOGGED IN BEFORE RENDERING A PROFILE
    res.render('site/profile');
  } else {
    res.redirect('/signup');
  }
});

//ROUTE:  Logout
router.get('/logout', function (req, res) {
  // Send home.ejs file to the client

  req.session = null; // This deletes cookie data
  res.render('site/logout');
});

module.exports = router;
