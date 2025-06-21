import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
     const token=req.header("auth-token");
    if (!token) return res.status(401).json({ message: 'No token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userr= await User.findById(decoded.id).select('-password');
    if (!userr) {
        return res.status(401).json({ message: 'User not found or authorized' });
    }
    req.user=userr;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Admin only' });
};