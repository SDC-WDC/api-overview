const { Pool } = require('pg');

const DB_NAME = 'products_db';
const credentials = {
  user: "joshandromidas",
  host: "localhost",
  database: DB_NAME,
  password: "",
  port: 5432,
};

const getAllProducts = async (req, res) => {
  const { page = 1, count = 5 } = req.query;
  const countLimit = 500;
  let limit;
  count > countLimit ? limit = countLimit : limit = count;

  const pool = new Pool(credentials);
  const query = `SELECT *
                  FROM products
                  WHERE id > ${limit * (page - 1)}
                  ORDER BY id ASC
                  LIMIT ${limit};`

  try {
    const response = await pool.query(query)
    res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const getProductInfo = async (req, res) => {
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
}



module.exports = { getAllProducts, getProductInfo };
