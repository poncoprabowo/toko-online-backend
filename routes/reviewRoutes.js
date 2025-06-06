// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

router.post('/review', authenticate, reviewController.createReview);
router.get('/reviews/:id', reviewController.getProductReviews);
router.delete('/admin/reviews/:id', isAdmin, reviewController.deleteReviewByAdmin);

module.exports = router;

console.log('typeof createReview:', typeof reviewController.createReview); // Harus "function"
console.log('typeof deleteReviewByAdmin:', typeof reviewController.deleteReviewByAdmin); // Harus "function"