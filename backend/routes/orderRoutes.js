import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const router = express.Router();

// Local JSON DB helper for orders
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_ORDERS_FILE = path.join(__dirname, '..', 'local_orders.json');

const getLocalOrders = () => {
  if (!fs.existsSync(LOCAL_ORDERS_FILE)) {
    fs.writeFileSync(LOCAL_ORDERS_FILE, JSON.stringify([], null, 2));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(LOCAL_ORDERS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
};

const saveLocalOrder = (order) => {
  const orders = getLocalOrders();
  orders.push(order);
  fs.writeFileSync(LOCAL_ORDERS_FILE, JSON.stringify(orders, null, 2));
  return order;
};

// Get all orders (Admin only)
router.get('/', async (req, res) => {
  try {
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('👥 Returning Local Orders (DB disconnected)');
      return res.json(getLocalOrders().reverse());
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { items, customerDetails, totalPrice } = req.body;
    
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('🛒 Creating Local Order (DB disconnected)');
      const newOrder = {
        _id: Date.now().toString(),
        items,
        customerDetails,
        totalPrice,
        createdAt: new Date().toISOString()
      };
      return res.status(201).json(saveLocalOrder(newOrder));
    }

    const newOrder = new Order({
      items,
      customerDetails,
      totalPrice
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('🔄 Updating Local Order Status (DB disconnected):', req.params.id);
      let orders = getLocalOrders();
      const index = orders.findIndex(o => o._id === req.params.id);
      if (index !== -1) {
        orders[index].status = req.body.status;
        fs.writeFileSync(LOCAL_ORDERS_FILE, JSON.stringify(orders, null, 2));
        return res.json(orders[index]);
      }
      return res.status(404).json({ message: 'Order not found locally' });
    }

    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('🗑️ Deleting Local Order (DB disconnected):', req.params.id);
      let orders = getLocalOrders();
      orders = orders.filter(o => o._id !== req.params.id);
      fs.writeFileSync(LOCAL_ORDERS_FILE, JSON.stringify(orders, null, 2));
      return res.json({ message: 'Order deleted (Local Fallback)' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
