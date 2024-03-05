const express = require('express');
const router = express.Router();
const { signupUser, loginUser, forgotpasswordUser, resetpasswordUser } = require('../controllers/userController');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgotpassword',forgotpasswordUser)
router.post('/resetpassword/:token', resetpasswordUser)

module.exports = router;
