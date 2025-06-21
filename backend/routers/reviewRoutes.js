import express from 'express';
import { getReviews, addReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.get('/get-reviews', getReviews);
router.post('/add-review', protect, addReview);

export default router;