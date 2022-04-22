// require('dotenv').config();
const express = require('express');
require('dotenv').config()

const { getAllProducts, getProductInfo, getStyles, getRelated } = require('./controllers.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products/*/related', getRelated);

app.get('/products/*/styles', getStyles);

app.get('/products/*', getProductInfo);

app.get('/products', getAllProducts);

app.listen(3504, () => {
  console.log('Listening on port 3504');
});
