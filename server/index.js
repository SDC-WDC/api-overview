// require('dotenv').config();
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// const dbCreate = require('../db/dbCreate');

import { getAllProducts, getProductInfo, getStyles, getRelated } from './controllers.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products/*/related', getRelated);

app.get('/products/*/styles', getStyles);

app.get('/products/*', getProductInfo);

app.get('/products', getAllProducts);

app.get('/', (req, res) => {
  res.send('this is the api project');
});

// dbCreate.run();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
