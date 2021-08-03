const connection = require("../connection");
const db = connection.promise();

const findAll = () => {
  return db
    .query(`SELECT * FROM category`)
    .then(([result]) => result)
}

const findOne = (id) => {
  return db
    .query(`SELECT * FROM category c JOIN flux f ON c.id = f.category_id WHERE c.id = ?`, [id])
    .then(([result]) => result)
}

module.exports = {
  findAll,
  findOne,
};
