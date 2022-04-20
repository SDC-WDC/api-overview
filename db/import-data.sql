COPY products(
  id,
  name,
  slogan,
  description,
  category,
  default_price
)
FROM
  '/Users/joshandromidas/HR_PRECOURSE/SDC/api-overview/source_files/product.csv' DELIMITER ',' CSV HEADER;

COPY styles(
  id,
  productId,
  name,
  sale_price,
  original,
  default_style
)
FROM
  '/Users/joshandromidas/HR_PRECOURSE/SDC/api-overview/source_files/styles.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;

COPY features(id, product_id, feature, "value")
FROM
  '/Users/joshandromidas/HR_PRECOURSE/SDC/api-overview/source_files/features.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM
  '/Users/joshandromidas/HR_PRECOURSE/SDC/api-overview/source_files/related.csv' DELIMITER ',' CSV HEADER
WHERE
  related_product_id != 0;

COPY skus(id, styleId, size, quantity)
FROM
  '/Users/joshandromidas/HR_PRECOURSE/SDC/api-overview/source_files/skus.csv' DELIMITER ',' CSV HEADER;

COPY photos(id, styleId, url, thumbnail_url)
FROM
  '/Users/joshandromidas/HR_PRECOURSE/SDC/api-overview/source_files/photos.csv' DELIMITER ',' CSV HEADER;