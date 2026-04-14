import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  img: {
    type: String, // String for URL or Base64
    default: ""
  },
  category: {
    type: String,
    enum: ['kiyim', 'oyoq-kiyim', 'aksessuar'],
    default: 'kiyim'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
