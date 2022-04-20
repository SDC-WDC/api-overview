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
  features: [{
    feature: String,
    value: String,
  }],
  styles: [{ type: Schema.Types.ObjectId, ref: 'Style' }],
}));

const Style = mongoose.model('Style', new Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  "default?": Boolean,
  photos: [{
    thumbnail_url: String,
    url: String,
  }],
}));

