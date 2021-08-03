const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  connection
    .promise()
    .query(`SELECT * FROM category`)
    .then(([result]) => {
      res.json(result);
    })
});

router.get('/:id', (req, res) => {
  connection
    .promise()
    .query(`SELECT * FROM category c JOIN flux f ON c.id = f.category_id WHERE c.id = ?`, [req.params.id])
    .then(([result]) => {
      res.json(result);
    })
});

module.exports = router;
