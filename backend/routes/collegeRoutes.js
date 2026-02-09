const express = require('express');
const router = express.Router();
const { predictColleges } = require('../controllers/collegeController');

// Define the POST route
// Final URL will be: http://localhost:5000 /api/predict
router.post('/predict', predictColleges);

module.exports = router;