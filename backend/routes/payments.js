const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const { createRazorpayOrder, razorpayWebhook } = require('../controllers/paymentController');

// Create order (JSON)
router.post('/razorpay/create-order', expressAsyncHandler(createRazorpayOrder));

// Webhook - use raw body parser for security verification
router.post('/razorpay/webhook', bodyParser.raw({ type: 'application/json' }), razorpayWebhook);

module.exports = router;
