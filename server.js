// Require node_modules
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      knex = require('./db'),
      bcrypt = require('bcrypt-as-promised'),
      cookieSession = require('cookie-session');

//LOAD ENV FILE FOR SECRETS
if (process.env.APP_MODE !== 'production') {
  require('dotenv').config(); // LOAD IN .env file in development
}

// Check the process.env for a PORT value or
// set it to the default of 8000.
const PORT = process.env.PORT || '8000';

// Logger for incoming requests
app.use(morgan('common'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Add cookie session
app.use(cookieSession({
  name: 'foodApp',
  // DON'T PUT SECURE VALUES IN THE APP
  keys: [
    process.env.SECRET_ONE,
    process.env.SECRET_TWO
  ],
}));

// Tell the body parser to "translate" the form
// it's getting form the client INTO A req.body OBJECT
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

const yelp = require('yelp-fusion');
app.use(function (req, res, next) {
  yelp.accessToken(
    process.env.YELP_CLIENT_ID,
    process.env.YELP_CLIENT_SECRET
  )
    .then(function (response) {
      res.locals.token = response.jsonBody.access_token;
      next()
    })
    .catch(function () {
      next();
    })
})


//TELL PARSER TO "TRANSLATE" ???? INTO JSON
app.use(bodyParser.json());

//FOR USER REGISTRATION
const users = require('./routes/users');
//USER REGISTRATION
app.use(users);

// For site related routes
const site = require('./routes/site');
app.use(site);

// Telling express we will template with EJS files
app.set('view engine', 'ejs');

app.listen(PORT, function () {
  console.log('SERVER RUNNING', PORT);
});
