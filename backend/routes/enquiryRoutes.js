const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

// POST /api/enquiry
router.post('/', enquiryController.sendEnquiry);

module.exports = router;