const axios = require('axios');
const express = require('express');
const parser = require('fast-xml-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const router = express.Router();

router.get('/:id', (req, res) => {
  prisma.flux
    .findUnique({
      where : {
        id : parseInt(req.params.id),
      }
    })
    .then(flux => {
      if (!flux) {
        res.status(404).json({});
      } else {
        axios.get(flux.url)
        .then((response) => {
          res.json(parser.parse(response.data));
        });
      }
    });
});

router.get('/', (req, res) => {
  const ids = req.query.ids && req.query.ids.split(',').map(x=>+x)
  prisma.flux
    .findMany({
      where: {
        id : {
          in : ids
        },
        title : {
          contains: req.query.search
        }
      }
    })
    .then(flux => {
      res.status(200).json(flux)
    });
});

module.exports = router;
