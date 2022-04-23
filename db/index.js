// const { Pool } = require('pg');
import pg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pg;
dotenv.config();

console.log('loading up db index');
console.log('process.env.DB', process.env.DB);

const credentials = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
};

const pool = new Pool(credentials);

const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

export { db }
