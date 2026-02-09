const express = require('express');
const router = express.Router();
const { predictColleges, percentileToRank } = require('../controllers/collegeController');
const {exportPredictPDF}=require('../controllers/predictPdfController')

// Define the POST route
// Final URL will be: http://localhost:5000 /api/predict
router.post('/predict', predictColleges);
router.post('/percentile2rank', percentileToRank);
router.post('/predict/pdf', exportPredictPDF);


module.exports = router;