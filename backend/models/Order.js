import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    title: String,
    price: String,
    quantity: Number,
    size: String,
    img: String
  }],
  customerDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
