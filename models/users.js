const connection = require("../connection");
const { v4: uuidv4 } = require('uuid');
const db = connection.promise();

const findOneByEmailAndPassword = (email) => {
  return db
    .query(`SELECT * FROM user WHERE email = ?`, [email])
    .then(([result]) => result)
}

const findOneByToken = (token) => {
  return db
    .query(`SELECT * FROM user WHERE token = ?`, [token])
    .then(([result]) => result)
}

const createToken = (id) => {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  const token = uuidv4();
  return db
    .query(`UPDATE user SET token = ?, token_expiration = ? WHERE id = ?`, [token, date, id])
    .then(() => ({ token, token_expiration: date }))
}

module.exports = {
  findOneByEmailAndPassword,
  createToken,
  findOneByToken,
};
