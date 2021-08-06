const connection = require("../connection");
const db = connection.promise();

const findOne = (id) => {
  return db
    .query(`SELECT * FROM flux WHERE id = ?`, [id])
    .then(([result]) => result)
}

const findAll = (queryParams) => {
  let query = 'SELECT * FROM flux';
  const sqlParams = [];

  if (queryParams && Object.keys(queryParams).length > 0) {
    query += ` WHERE`;

    if (queryParams.search) {
      query += ' title LIKE ?';
      sqlParams.push(`%${queryParams.search}%`);
    }

    if (queryParams.ids) {
      const ids = queryParams.ids.split(',');
      driverIdValsPlaceHolders = Array(ids.length).fill("?").join();
      query += ` id IN (${driverIdValsPlaceHolders})`;
      sqlParams.push(...ids);
    }
  }

  return db
    .query(query, sqlParams)
    .then(([result]) => result)
}

module.exports = {
  findOne,
  findAll,
};
