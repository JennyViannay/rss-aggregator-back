const express = require('express');
const argon2 = require('argon2');
const { findOneByEmailAndPassword, createToken, findOneByToken } = require('../models/users');

const router = express.Router();

router.post('/login', (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    findOneByEmailAndPassword(req.body.email)
    .then(user => {
      const dbUser = user[0];
      if (dbUser) {
        argon2.verify(dbUser.password, req.body.password).then(isValid => {
          if (isValid) {
            createToken(dbUser.id).then(({token, token_expiration}) => {
              res.json({
                success: true,
                user: {
                  ...dbUser,
                  token,
                  token_expiration,
                  password: 'hidden',
                }
              });
            });
          } else {
            res.json({
              success: false,
              message: 'Invalid email or password'
            });
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
});

module.exports = router;
