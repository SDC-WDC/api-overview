// require('dotenv').config();
const express = require('express');
// const axios = require('axios');
// const compression = require('compression');
// const expressStaticGzip = require('express-static-gzip');

const app = express();
// app.use(compression());
// app.use(expressStaticGzip(`${__dirname}/../client/dist`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products*', (req, res) => {
  console.log(`GET to ${req.originalUrl}`)
  res.send('')
  // search DB
  // send response with results
})

app.listen(3504, () => {
  console.log('Listening on port 3504');
})