const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const router = express.Router();

router.get('/', (req, res) => {
  prisma.category
    .findMany()
    .then(categories => {
      res.json(categories);
    });
});

router.get('/:id', (req, res) => {
  prisma.category
    .findUnique({
      where : {
        id : parseInt(req.params.id),
      },
      select : {
        id : true,
        name : true,
        flux: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })
    .then(categories => {
      if (!categories) {
        res.status(404).json(categories);
      } else {
        res.json(categories);
      }
    });
});

module.exports = router;
