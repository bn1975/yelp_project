const router = require('express').Router();

//ROUTE:  Homepage
router.get('/', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/home');
});

//ROUTE:  Sign-up
router.get('/signup', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/signup');
});

//ROUTE:  Profile
router.get('/profile', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/profile');
});

//ROUTE:  Logout
router.get('/logout', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/logout');
});

module.exports = router;
