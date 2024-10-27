const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');

router.get('/:id', reviewController.getAllReview);
router.post('/create/:id', authenticate, reviewController.createReview);
router.put('/update/:id', reviewController.updateReview);
router.delete('/delete/:id', reviewController.deleteReview);

module.exports = router;