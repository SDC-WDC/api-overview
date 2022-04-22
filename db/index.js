const { Pool } = require('pg');

const credentials = {
  host: 'db',
  user: 'admin',
  password: '987654321',
  database: 'products_db',
};
const pool = new Pool(credentials);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}
