const router = require('express').Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../db');
const url = require('url');



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
    // Turn cookie urlencoded position into a query and parse using URL node module
    // i.e. turn  lat=111.11111&long=77.77777
    //      into ?lat=111.11111&long=77.77777 by prepending the ? symbol
    // then parse using url.parse which sees the ? and knows it's a query
    // returning
    //  { lat: '111.11111', long: '77.77777' }
    const positionQueryString = '?' + req.cookies.userPosition;
    const position = url.parse(positionQueryString, true).query;
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
