// const pgtools = require('pgtools');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const imports = require('./imports');

const DB_NAME = 'products_db';

// Drop database if exists and create new one
const setupDatabase = () => {
  const conString = 'postgres://joshandromidas@localhost:5432/postgres';
  const client = new Client(conString);

  return new Promise(async (resolve, reject) => {
    try {
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
  const conString = `postgres://joshandromidas@localhost:5432/${DB_NAME}`;
  const client = new Client(conString);

  return new Promise(async (resolve, reject) => {
    try {
      client.connect();

      const createTables = fs.readFileSync(path.resolve(__dirname, './create-tables.sql')).toString();
      await client.query(createTables);

      client.end();
      resolve();
    } catch (err) {
      client.end();
      reject(err);
    }
  });
}

const importData = () => {
  const conString = `postgres://joshandromidas@localhost:5432/${DB_NAME}`;
  const client = new Client(conString);

  return new Promise((resolve, reject) => {
    client.connect();
    const promises = [];

    console.log('Importing .csv files...');

    promises.push(client.query(imports.products))
    promises.push(client.query(imports.styles))
    promises.push(client.query(imports.features))
    promises.push(client.query(imports.related))
    promises.push(client.query(imports.skus))
    promises.push(client.query(imports.photos))

    Promise.all(promises)
      .then(() => {
        console.log('Done!');
        client.end();
        resolve();
      })
      .catch((err) => {
        client.end();
        reject(err);
      })
  });
}

const indexData = async () => {
  const conString = `postgres://joshandromidas@localhost:5432/${DB_NAME}`;
  const client = new Client(conString);

  return new Promise(async (resolve, reject) => {
    try {
      client.connect();

      const indexData = fs.readFileSync(path.resolve(__dirname, './index-data.sql')).toString();
      console.log('Indexing data in tables...');
      await client.query(indexData);
      console.log('Done!');

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
  console.log('Initializing database setup...');
  try {
    await setupDatabase();
    console.log('✅ successfully created database');
    await createTables();
    console.log('✅ successfully created tables');
    await importData();
    console.log('✅ successfully imported data');
    await indexData();
    console.log('✅ successfully indexed data');
  } catch (err) {
    console.log('❌ Uh oh, an error occurred:', err)
  }
})();
