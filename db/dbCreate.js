// const pgtools = require('pgtools');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const imports = require('./imports');
require('dotenv').config()

const credentials = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
};

// Drop database if exists and create new one
const resetDatabase = () => {
  const client = new Client({ ...credentials, database: 'postgres' });

  return new Promise(async (resolve, reject) => {
    try {
      client.connect();

      await client.query(`DROP DATABASE IF EXISTS ${process.env.DB};`);
      await client.query(`CREATE DATABASE ${process.env.DB};`);

      client.end();
      resolve();
    } catch (err) {
      client.end();
      reject(err);
    }
  });
}

const createTables = async () => {
  const client = new Client(credentials);

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
  const client = new Client(credentials);

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
  const client = new Client(credentials);

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
    // await resetDatabase();
    // console.log('✅ successfully created database');
    await createTables();
    console.log('✅ successfully created tables');
    // await importData();
    // console.log('✅ successfully imported data');
    // await indexData();
    // console.log('✅ successfully indexed data');
  } catch (err) {
    console.log('❌ Uh oh, an error occurred:', err)
  }
})();


module.exports = {
  startImport: async () => {
    await importData();
    console.log('✅ successfully imported data');
    await indexData();
    console.log('✅ successfully indexed data');
  }
}


// module.exports = {
//   run: async () => {
//     console.log('Initializing database setup...');
//     try {
//       await resetDatabase();
//       console.log('✅ successfully created database');
//       await createTables();
//       console.log('✅ successfully created tables');
//       await importData();
//       console.log('✅ successfully imported data');
//       await indexData();
//       console.log('✅ successfully indexed data');
//     } catch (err) {
//       console.log('❌ Uh oh, an error occurred:', err)
//     }
//   }
// }