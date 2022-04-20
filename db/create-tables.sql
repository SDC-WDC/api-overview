CREATE TABLE products(
  id INT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price INT NOT NULL
);

CREATE TABLE styles(
  id INT PRIMARY KEY NOT NULL,
  productId INT NOT NULL REFERENCES products(id),
  name TEXT NOT NULL,
  sale_price INT,
  original INT NOT NULL,
  default_style INT NOT NULL
);

CREATE TABLE features(
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL REFERENCES products(id),
  feature TEXT NOT NULL,
  value TEXT
);

CREATE TABLE related(
  id INT PRIMARY KEY NOT NULL,
  current_product_id INT NOT NULL REFERENCES products(id),
  related_product_id INT NOT NULL REFERENCES products(id)
);

CREATE TABLE skus(
  id INT PRIMARY KEY NOT NULL,
  styleId INT NOT NULL REFERENCES styles(id),
  size TEXT NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE photos(
  id INT PRIMARY KEY NOT NULL,
  styleId INT NOT NULL REFERENCES styles(id),
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);