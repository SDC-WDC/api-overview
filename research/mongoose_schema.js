import mongoose from 'mongoose';
const { Schema } = mongoose;

const Product = mongoose.model('Product', new Schema({
  id: Number,
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: String,
  updated_at: String,

  // Since there won't reasonably be more than a few features and styles ( always < 100 ),
  // we can safely nest documents without worrying about performance loss. We can keep it all
  // nested in one main PRODUCT document, allowing for much simpler read/write operations.

  // BUT, now I'm thinking that, in order to get a list of all the products, we're basically
  // going to read the ENTIRE database and remove data as we parse and send it via an API
  // response. Is that bad for scalability and speed? Should 'features' and 'styles' be separate?

  // Limitations of one big doc:
  // - Avoid sorting large groups of documents (1000), even if docs are small (32MB memory limit)

  features: [{
    feature: String,
    value: String,
  }],
  styles: [{
    style_id: Number,
    name: String,
    original_price: String,
    sale_price: String,
    "default?": Boolean,
    photos: [{
      thumbnail_url: String,
      url: String,
    }],
  }],
}));

const result = Products.find() // -> [EVERYTHING]

const output = {
  id: result.id,
  name: result.campus,
  name: result.name,
}

res.send(output)
