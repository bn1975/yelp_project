'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../db');


// FOR USER REGISTRATION
// ALLOW a POST request to either /users or /signup
router.post(['/users', '/signup'], (req, res, next) => {
  bcrypt.hash(req.body.password, 12) // HASH new USER PASSWORD
    .then((hashed_password) => { // INSERT user and hashed_password
      console.log(hashed_password)
      return knex('users')
        .insert({
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      const currentUser = users[0];
      req.session.user_id = currentUser.id; // Log User's id in cookie session

      // Note how we store little in the session
      //  i.e. only storing the user_id instead of whole object
      res.redirect('/profile')
    })
    .catch((err) => {
      next(err);
    });
});





module.exports = router;
