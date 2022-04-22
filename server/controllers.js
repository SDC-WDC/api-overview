const db = require('../db');

// Helper function to extract and validate product ID
const getAndValidateId = (path, split) => {
  const p_id = (path.split('/'))[split];
  if (isNaN(p_id)) {
    return -1;
  }
  return p_id;
}

const getAllProducts = async (req, res) => {
  const { page = 1, count = 5 } = req.query;
  const maxCount = 100;
  let limit;
  count > maxCount ? limit = maxCount : limit = count;

  const query = `SELECT *
                  FROM products
                  WHERE id > ${limit * (page - 1)}
                  ORDER BY id ASC
                  LIMIT ${limit};`;

  try {
    const response = await db.query(query);
    res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const getProductInfo = async (req, res) => {
  // Validate and extract product ID
  const p_id = getAndValidateId(req.path, 2);
  if (p_id === -1) return res.send('Invalid product ID');

  try {
    const response = await db.query(`SELECT * FROM products WHERE id = ${p_id}`);

    if (response.rowCount === 0) {
      return res.status(404).send('The resource you requested could not be found.');
    }

    const features = await db.query(`SELECT feature, value FROM features WHERE product_id = ${p_id}`);
    const responseObj = response.rows[0];

    responseObj.features = features.rows;
    res.status(200).json(responseObj);

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.')
  }
}

const getStyles = async (req, res) => {
  // Validate and extract product ID
  const p_id = getAndValidateId(req.path, 2);
  if (p_id === -1) return res.send('Invalid product ID');

  const responseObj = {
    product_id: p_id.toString(),
    results: []
  };

  try {
    const styles = await db.query(`
      SELECT
        id AS style_id,
        name,
        original AS original_price,
        case when default_style = 1 then true else false end AS "default?"
      FROM styles
      WHERE productId = ${p_id};
    `);

    for (let style of styles.rows) {
      const tempObj = style;
      const photos = await db.query(`
        SELECT
          thumbnail_url,
          url
        FROM photos
        WHERE styleid = ${style.style_id};
      `);
      tempObj.photos = photos.rows;
      const skus = await db.query(`
        SELECT
          size,
          quantity
        FROM skus
        WHERE styleid = ${style.style_id};
      `);
      tempObj.skus = skus.rows;
      responseObj.results.push(tempObj);
    }

    responseObj.results = styles.rows;

    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.');
  }
}

const getRelated = async (req, res) => {
  const p_id = getAndValidateId(req.path, 2);
  if (p_id === -1) return res.send('Invalid product ID');

  try {
    const response = await db.query(`
      SELECT ARRAY(SELECT related_product_id
        FROM related
        WHERE current_product_id = ${p_id});
    `);
    console.log(response.rows[0].array);
    res.status(200).json(response.rows[0].array);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.');
  }
}

module.exports = { getAllProducts, getProductInfo, getStyles, getRelated };
