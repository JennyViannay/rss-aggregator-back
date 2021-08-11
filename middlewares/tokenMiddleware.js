const { findOneByToken } = require('../models/users');

const tokenMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    findOneByToken(req.headers.authorization).then(user => {
      const dbUser = user[0];
      if (dbUser && dbUser.token === req.headers.authorization && dbUser.token_expiration > Date.now()) {
        next();
      } else {
        res.status(401).send({
          message: 'Expired token'
        });
      }
    })
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    });
  }
};

module.exports = {
  tokenMiddleware,
};
