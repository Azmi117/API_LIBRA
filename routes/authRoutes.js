const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');

router.post('/register', upload.single('photo'), authController.register);
router.post('/login', authController.login);

module.exports = router;