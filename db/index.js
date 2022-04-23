const { Pool } = require('pg');

const credentials = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
};

const pool = new Pool(credentials);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}
