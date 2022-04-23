// require('dotenv').config();
const express = require('express');
require('dotenv').config()
// const dbCreate = require('../db/dbCreate');

const { getAllProducts, getProductInfo, getStyles, getRelated } = require('./controllers.js');

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
