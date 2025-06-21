import express from 'express';
import { getBooks, getBookById, addBook } from '../controllers/bookController.js';
import { isAdmin, protect } from '../middleware/auth.js';
const router = express.Router();

router.get('/get-books', getBooks);
router.get('/getbook/:id', getBookById);
router.post('/add-book', protect, isAdmin, addBook);

export default router;
