// Require node_modules
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      knex = require('./db')
      bcrypt = require('bcrypt-as-promised');

// Check the process.env for a PORT value or
// set it to the default of 8000.
const PORT = process.env.PORT || '8000';

// Tell the body parser to "translate" the form
// it's getting form the client INTO A req.body OBJECT
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));



//FOR USER REGISTRATION
const users = require('./routes/users');
//USER REGISTRATION
app.use(users);


// For site related routes
const site = require('./routes/site');
app.use(site);

// Logger for incoming requests
app.use(morgan('common'));

// Telling express we will template with EJS files
app.set('view engine', 'ejs');



app.listen(PORT, function () {
  console.log('SERVER RUNNING', PORT);
});
