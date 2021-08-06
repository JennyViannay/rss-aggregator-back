const axios = require('axios');
const express = require('express');
const parser = require('fast-xml-parser');
const Flux = require('../models/flux');

const router = express.Router();

router.get('/:id', (req, res) => {
  Flux
  .findOne(req.params.id)
  .then(flux => {
    if (flux.length === 0) {
      res.status(404).json({});
    } else {
      axios.get(flux[0].url)
        .then((response) => {
          res.json(parser.parse(response.data));
        });
    }
  });
});

router.get('/', (req, res) => {
  Flux
  .findAll(req.query)
  .then(flux => {
    res.status(200).json(flux);
  });
});

module.exports = router;
