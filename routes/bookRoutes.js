const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');
const uploads = require('../middlewares/uploadMiddleware');

router.get('/', bookController.getAllBook);
router.get('/:id', bookController.getBookById);
router.post('/create', authenticate, authorize('admin'), uploads.single('photo'), bookController.createBook);
router.put('/update/:id', authenticate, authorize("admin"), uploads.single('photo'), bookController.updateBook);
router.delete('/delete/:id', authenticate, authorize("admin"), bookController.deleteBook);

module.exports = router;