const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');
const uploads = require('../middlewares/uploadMiddleware');

router.get('/', authenticate, authorize('Admin'), userController.getAllUser);
router.get('/me', authenticate, userController.getUserById);
router.get('/:id', userController.getOneUser);
router.put('/update/:id', uploads.single('photo'), authenticate, userController.updateUser);
router.delete('/delete/:id', authenticate, userController.deleteUser);

module.exports = router;