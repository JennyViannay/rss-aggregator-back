const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const tokenMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    prisma.user
    .findUnique({
      where : {
        token : req.headers.authorization,
      },
    })
      .then(user => {
      if (user && user.token === req.headers.authorization && user.token_expiration > Date.now()) {
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
