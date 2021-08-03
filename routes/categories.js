const express = require('express');
const Category = require('../models/category');

const router = express.Router();

router.get('/', (req, res) => {
  Category
    .findAll()
    .then(categories => {
      res.json(categories);
    });
});

router.get('/:id', (req, res) => {
  Category
  .findOne(req.params.id)
  .then(categories => {
    if (categories.length === 0) {
      res.status(404).json(categories);
    } else {
      res.json(categories);
    }
  });
});

module.exports = router;
