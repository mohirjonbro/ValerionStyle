import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const router = express.Router();

// Local JSON DB helper for products
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_PRODUCTS_FILE = path.join(__dirname, '..', 'local_products.json');

const getLocalProducts = () => {
  if (!fs.existsSync(LOCAL_PRODUCTS_FILE)) {
    const initialProducts = [
      {
        _id: 'p1',
        title: "Белый свитер",
        description: "Issiq va qulay oq sviter",
        price: "320 000 so'm + Карго",
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
        category: "kiyim"
      },
      {
        _id: 'p2',
        title: "Черный свитер",
        description: "Zamonaviy qora sviter",
        price: "350 000 so'm + Карго",
        img: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=500&auto=format&fit=crop",
        category: "kiyim"
      }
    ];
    fs.writeFileSync(LOCAL_PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
    return initialProducts;
  }
  try {
    return JSON.parse(fs.readFileSync(LOCAL_PRODUCTS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
};

const saveLocalProduct = (product) => {
  const products = getLocalProducts();
  products.push(product);
  fs.writeFileSync(LOCAL_PRODUCTS_FILE, JSON.stringify(products, null, 2));
  return product;
};

// Get all products
router.get('/', async (req, res) => {
  try {
    const localProducts = getLocalProducts();
    
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('📦 Returning Local Products (DB disconnected)');
      return res.json(localProducts.map(p => ({ ...p, source: 'local' })));
    }

    const dbProducts = await Product.find();
    
    // Deduplicate by title
    const productMap = new Map();
    
    // Add local products first
    localProducts.forEach(p => {
      productMap.set(p.title, { ...p, source: 'local' });
    });
    
    // Add/Overwrite with DB products
    dbProducts.forEach(p => {
      productMap.set(p.title, { ...p.toObject(), source: 'mongodb' });
    });

    const allProducts = Array.from(productMap.values());
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add product
router.post('/', async (req, res) => {
  try {
    const { title, description, price, img, category } = req.body;
    
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('➕ Adding Local Product (DB disconnected):', title);
      const newProduct = {
        _id: Date.now().toString(),
        title,
        description,
        price,
        img,
        category
      };
      return res.status(201).json(saveLocalProduct(newProduct));
    }

    const newProduct = new Product({
      title,
      description,
      price,
      img,
      category
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('edit Local Product (DB disconnected):', req.params.id);
      let products = getLocalProducts();
      const index = products.findIndex(p => p._id === req.params.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        fs.writeFileSync(LOCAL_PRODUCTS_FILE, JSON.stringify(products, null, 2));
        return res.json(products[index]);
      }
      return res.status(404).json({ message: 'Product not found locally' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('🗑️ Deleting Local Product (DB disconnected):', req.params.id);
      let products = getLocalProducts();
      products = products.filter(p => p._id !== req.params.id);
      fs.writeFileSync(LOCAL_PRODUCTS_FILE, JSON.stringify(products, null, 2));
      return res.json({ message: 'Product deleted (Local Fallback)' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear all products (Admin only)
router.delete('/clear-all', async (req, res) => {
  try {
    // Clear local products (keeping initial ones or just empty)
    const initialProducts = [
      {
        _id: 'p1',
        title: "Белый свитер",
        description: "Issiq va qulay oq sviter",
        price: "320 000 so'm + Карго",
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
        category: "kiyim"
      }
    ];
    fs.writeFileSync(LOCAL_PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));

    // Clear MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      await Product.deleteMany({});
    }

    res.json({ message: 'All products cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
