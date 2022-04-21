const { Pool } = require('pg');

const DB_NAME = 'products_db';
const credentials = {
  user: "joshandromidas",
  host: "localhost",
  database: DB_NAME,
  password: "",
  port: 5432,
};
const pool = new Pool(credentials);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}
