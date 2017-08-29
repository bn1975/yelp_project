// Require node_modules
const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      knex = require('./db');

const app = express();

// Check the process.env for a PORT value or
// set it to the default of 8000.
const PORT = process.env.PORT || '8000';

// Tell the body parser to "translate" the form
// it's getting form the client INTO A req.body OBJECT
app.use(bodyParser.urlencoded({extended: false}));

// Logger for incoming requests
app.use(morgan('common'));

// Telling express we will template with EJS files
app.set('view engine', 'ejs');

//ROUTE:  Homepage
app.get('/', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/home');
});

//ROUTE:  Sign-up
app.get('/signup', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/signup');
});

//ROUTE:  Profile
app.get('/profile', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/profile');
});

//ROUTE:  Logout
app.get('/logout', function (req, res) {
  // Send home.ejs file to the client
  res.render('site/logout');
});

app.listen(PORT, function () {
  console.log('SERVER RUNNING', PORT);
});
