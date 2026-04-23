import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

// Mongoose bufferingni o'chirish (baza ulanmagan bo'lsa kutib o'tirmasligi uchun)
mongoose.set('bufferCommands', false);

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); 
app.use(cors());

// DB connection check middleware
app.use((req, res, next) => {
  // Allow auth and products to proceed even if DB is not connected (for development fallback)
  if (req.path === '/api/auth/login' || 
      req.path === '/api/auth/register' || 
      req.path === '/api/auth/users' || 
      req.path === '/api/auth/clear-all' || 
      req.path === '/api/products/clear-all' || 
      req.path.startsWith('/api/products') || 
      req.path.startsWith('/api/orders')) {
    return next();
  }
  
  if (mongoose.connection.readyState !== 1 && req.path.startsWith('/api')) {
    return res.status(503).json({ 
      message: 'Ma\'lumotlar bazasiga ulanish xatosi. Iltimos, server IP whitelist-ni tekshiring.' 
    });
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

import { seedDatabase } from './seed.js';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000 // 5 soniyadan keyin timeout beradi
})
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await seedDatabase();
  })
  .catch((err) => {
    console.error('\n' + '='.repeat(50));
    console.error('❌ MONGODB ULANISHDA XATO!');
    console.error('Xabar:', err.message);
    console.error('\nMUHIM: Agar siz MongoDB Atlas ishlatayotgan bo\'lsangiz,');
    console.error('IP manzilingizni "Whitelist"ga qo\'shganingizni tekshiring.');
    console.error('Qo\'llash: https://www.mongodb.com/docs/atlas/security-whitelist/');
    console.error('='.repeat(50) + '\n');
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
