import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const router = express.Router();

// Local JSON DB helper
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_USERS_FILE = path.join(__dirname, '..', 'local_users.json');

const getLocalUsers = () => {
  if (!fs.existsSync(LOCAL_USERS_FILE)) {
    const initialUsers = [{ username: 'sardor', role: 'admin', _id: '0000', password: '1234' }];
    fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(initialUsers, null, 2));
    return initialUsers;
  }
  try {
    let users = JSON.parse(fs.readFileSync(LOCAL_USERS_FILE, 'utf8'));
    // Migratsiya: id ni _id ga o'tkazish
    let migrated = false;
    users = users.map(u => {
      if (u.id && !u._id) {
        u._id = u.id;
        delete u.id;
        migrated = true;
      }
      return u;
    });
    if (migrated) {
      fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(users, null, 2));
    }
    return users;
  } catch (e) {
    return [];
  }
};

const saveLocalUser = (user) => {
  const users = getLocalUsers();
  if (!users.find(u => u.username === user.username)) {
    users.push(user);
    fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(users, null, 2));
  }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('📝 Local Register (DB disconnected):', username);
      saveLocalUser({ 
        username, 
        password, // Save password for local viewing in admin
        role: req.body.role || 'user', 
        _id: Date.now().toString(),
        registeredAt: new Date().toISOString() 
      });
      return res.status(201).json({ message: 'User registered successfully (Local Fallback)' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'user' // Default to user
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hardcoded fallback for development (Move this BEFORE DB query)
    if (username === 'sardor' && password === '1234') {
      const user = {
        _id: '000000000000000000000000',
        username: 'sardor',
        role: 'admin'
      };
      
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'fallbackSecret',
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      });
    }

    // Check local users if DB is disconnected
    if (mongoose.connection.readyState !== 1) {
      console.log('👤 Local Login Check:', username);
      const localUsers = getLocalUsers();
      const user = localUsers.find(u => u.username === username);

      if (!user) {
        return res.status(400).json({ message: 'Foydalanuvchi topilmadi (Local)' });
      }

      // Check password (local users might have plain text password for dev)
      if (user.password && user.password !== password) {
        return res.status(400).json({ message: 'Parol noto\'g\'ri (Local)' });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'fallbackSecret',
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      });
    }

    let user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users (Admin only)
router.get('/users', async (req, res) => {
  try {
    const localUsers = getLocalUsers();
    
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('👥 Returning Local Users (DB disconnected)');
      return res.json(localUsers.map(u => ({ ...u, source: 'local' })));
    }

    // Include passwords as requested for admin viewing
    const dbUsers = await User.find(); 
    
    // Deduplicate local and DB users by username
    const userMap = new Map();
    
    // Add local users first
    localUsers.forEach(u => {
      userMap.set(u.username, { ...u, source: 'local' });
    });
    
    // Add/Overwrite with DB users (DB users take priority)
    dbUsers.forEach(u => {
      userMap.set(u.username, { ...u.toObject(), source: 'mongodb' });
    });

    const allUsers = Array.from(userMap.values());

    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let deletedLocal = false;

    // Check local users
    let users = getLocalUsers();
    if (users.find(u => u._id === id)) {
      console.log('🗑️ Deleting Local User:', id);
      users = users.filter(u => u._id !== id);
      fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(users, null, 2));
      deletedLocal = true;
    }

    // Check MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      await User.findByIdAndDelete(id);
    }

    res.json({ message: deletedLocal ? 'User deleted (Local)' : 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear all users (Admin only)
router.delete('/clear-all', async (req, res) => {
  try {
    // Clear local users (keeping the default admin)
    const initialUsers = [{ username: 'sardor', role: 'admin', _id: '0000', password: '1234' }];
    fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(initialUsers, null, 2));

    // Clear MongoDB if connected (excluding admin)
    if (mongoose.connection.readyState === 1) {
      await User.deleteMany({ username: { $ne: 'sardor' } });
    }

    res.json({ message: 'All users cleared (except admin)' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
