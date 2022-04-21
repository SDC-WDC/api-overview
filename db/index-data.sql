CREATE INDEX styles_productid_idx ON styles (productid);

CREATE INDEX photos_styleid_idx ON photos (styleid);

CREATE INDEX skus_styleid_idx ON skus (styleid);

CREATE INDEX related_current_product_id_idx ON related (current_product_id);

CREATE INDEX features_product_id_idx ON features (product_id);