// const pgtools = require('pgtools');
const { Client } = require('pg');

const DB_NAME = 'products_db';
// const config = {
//   user: 'joshandromidas',
//   password: '',
//   port: 5432,
//   host: 'localhost'
// }

// Drop database if exists and create new one
const setupDatabase = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const conString = 'postgres://joshandromidas@localhost:5432/postgres';
      const client = new Client(conString);
      client.connect();

      await client.query(`DROP DATABASE IF EXISTS ${DB_NAME};`);
      await client.query(`CREATE DATABASE ${DB_NAME};`);

      client.end();
      resolve();
    } catch (err) {
      client.end();
      reject(err);
    }
  });
}

const createTables = async () => {
  const createProductsTable = `
    CREATE TABLE products(
      id INT PRIMARY KEY  NOT NULL,
      name           TEXT NOT NULL,
      slogan         TEXT NOT NULL,
      description    TEXT NOT NULL,
      category       TEXT NOT NULL,
      default_price  INT  NOT NULL
    );
  `;

  return new Promise(async (resolve, reject) => {
    try {
      const conString = `postgres://joshandromidas@localhost:5432/${DB_NAME}`;
      const client = new Client(conString);
      client.connect();

      const res = await client.query(createProductsTable);
      console.log('🚀 ~ returnnewPromise ~ res', res)

      client.end();
      resolve();
    } catch (err) {
      client.end();
      reject(err);
    }
  });
}

// Run setup functions with IIFE
(async () => {
  try {
    await setupDatabase();
    console.log('✅ successfully setup database');
    await createTables();
    console.log('✅ successfully setup tables');
  } catch (err) {
    console.log('❌ Uh oh, an error occurred:', err)
  }
})();

// setupDatabase()
//   .then(() => {
//     console.log('successfully setup database');
//     return createTables();
//   })
//   .then(() => {
//     console.log('successfully setup tables');
//   })
//   .catch(err => {
//     console.log(err);
//   })
