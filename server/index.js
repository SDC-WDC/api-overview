// require('dotenv').config();
const express = require('express');
const { Pool, Client } = require('pg');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_NAME = 'products_db';
const conString = 'postgres://joshandromidas@localhost:5432/products_db';
const credentials = {
  user: "joshandromidas",
  host: "localhost",
  database: DB_NAME,
  password: "",
  port: 5432,
};

app.get('/products/*/styles', async (req, res) => {
  const pool = new Pool(credentials);

  // Extract product ID from URL path (as Number to prevent injections)
  const p_id = (req.path.split('/'))[2];

  // Check for non-number id
  if (isNaN(p_id)) {
    res.send('Invalid product ID');
    return;
  }

  const responseObj = {
    product_id: p_id.toString(),
    results: []
  };

  try {
    const response = await pool.query(`
      SELECT
        id AS style_id,
        name,
        original AS original_price,
        case when default_style = 1 then true else false end AS "default?"
      FROM styles
      WHERE productId = ${p_id};
    `);

    if (response.rowCount === 0) {
      return res.status(404).send('The resource you requested could not be found.');
    }

    responseObj.results.push(response.rows);
    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.')
  }
})

app.get('/products/*', async (req, res) => {
  const pool = new Pool(credentials);

  // Extract product ID from URL path (as Number to prevent injections)
  const p_id = Number(req.path.split('/products/')[1]);

  // Check for non-number id
  if (isNaN(p_id)) {
    res.send('Invalid product ID');
    return;
  }

  try {
    const response = await pool.query(`SELECT * FROM products WHERE id = ${p_id}`);

    if (response.rowCount === 0) {
      return res.status(404).send('The resource you requested could not be found.');
    }

    const features = await pool.query(`SELECT feature, value FROM features WHERE product_id = ${p_id}`);
    const responseObj = response.rows[0];

    responseObj.features = features.rows;
    res.status(200).json(responseObj);

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.')
  }
})

app.get('/products', (req, res) => {
  console.log(`GET to ${req.originalUrl}`)
  const pool = new Pool(credentials);

  pool.query('SELECT * FROM products')
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    });
})

app.listen(3504, () => {
  console.log('Listening on port 3504');
})
