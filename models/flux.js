const connection = require("../connection");
const db = connection.promise();

const findOne = (id) => {
  return db
    .query(`SELECT * FROM flux WHERE id = ?`, [id])
    .then(([result]) => result)
}

const findAll = (searchValue) => {
  let query = 'SELECT * FROM flux';

  if (searchValue) {
    query += ` WHERE title LIKE ?`;
  }

  return db
    .query(query, [`%${searchValue}%`])
    .then(([result]) => result)
}

module.exports = {
  findOne,
  findAll,
};
