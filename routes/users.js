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
      return knex('users')
        .insert({
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      res.redirect('/profile')
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
