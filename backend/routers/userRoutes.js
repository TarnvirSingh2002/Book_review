import express from 'express';
import { getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import jwt from "jsonwebtoken";
const router = express.Router();

router.get('/detail', protect, getUser);
router.put('/:id', protect, updateUser);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/isAdmin', async (req, res) => {
  try {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Use environment variable securely
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }

    res.status(200).json({ message: 'Valid admin' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;