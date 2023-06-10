const express = require('express');
const {
    getContact,
    postContact,
    getContactById,
    updateContact,
    deleteContact,
} = require('../controller/contactController');
const { validation } = require('../middleware/validationTokenHandler');
const router = express.Router();

router.use(validation);
router.route('/').get(getContact).post(postContact);
router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);

module.exports = router;
