const path = require('path');

const csvOptions = ` DELIMITER ',' CSV HEADER `;

module.exports = {
  products: `COPY products(
      id,
      name,
      slogan,
      description,
      category,
      default_price
    )
    FROM
      '${path.resolve(__dirname, '../source_files/product.csv')}'
      ${csvOptions};`,

  styles: `COPY styles(
      id,
      productId,
      name,
      sale_price,
      original,
      default_style
    )
    FROM
      '${path.resolve(__dirname, '../source_files/styles.csv')}'
      NULL AS 'null'
      ${csvOptions};`,

  features: `COPY features(id, product_id, feature, "value")
    FROM
      '${path.resolve(__dirname, '../source_files/features.csv')}'
      NULL AS 'null'
      ${csvOptions};`,

  related: `COPY related(id, current_product_id, related_product_id)
    FROM
      '${path.resolve(__dirname, '../source_files/related.csv')}'
      ${csvOptions}
    WHERE
      related_product_id != 0;`,

  skus: `COPY skus(id, styleId, size, quantity)
    FROM
      '${path.resolve(__dirname, '../source_files/skus.csv')}' ${csvOptions};`,

  photos: `COPY photos(id, styleId, url, thumbnail_url)
    FROM
      '${path.resolve(__dirname, '../source_files/photos.csv')}' ${csvOptions};`

}