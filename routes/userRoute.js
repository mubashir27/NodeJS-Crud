const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controller/userController');
const { validation } = require('../middleware/validationTokenHandler');
// const {} = require('../controller/userController');
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', validation, currentUser);

module.exports = router;
