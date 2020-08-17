import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  img: { type: Array, of: String, required: true },
  price: { type: Number, required: true },
  onSale: { type: Boolean, required: true, default: false },
  salePrice: { type: Number, required: true, default: null },
  rating: { type: Number, required: true, default: 0 },
  reviews: { type: Number, required: true, default: null },
  stock: { type: Number, required: true, default: 1 },
  date: { type: Date, default: Date.now, immutable: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
