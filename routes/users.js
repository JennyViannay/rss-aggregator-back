const express = require('express');
const argon2 = require('argon2');
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient()

const router = express.Router();

router.post('/login', (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    prisma.user
      .findUnique({
        where : {
          email : req.body.email,
        }
      })
      .then(user => {
        if (user) {
          argon2.verify(user.password, req.body.password).then(isValid => {
            if (isValid) {
              const date = new Date();
              date.setHours(date.getHours() + 1);
              const token = uuidv4();
              prisma.user
                .update({
                  where : {
                    id : user.id,
                  },
                  data : {
                    token : token,
                    token_expiration: date,
                  }
                })
                .then(({token, token_expiration}) => {
                  res.json({
                    success: true,
                    user: {
                      ...user,
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
  } else {
    return res.json({
      success: false,
      message: 'Please add email and password'
    });
  }
});

module.exports = router;
