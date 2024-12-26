const express = require('express');
const { getReceipts, createReceipt, confirmReceipt, cancelReceipt } = require('../controllers/receiptsController');
const router = express.Router();

router.get('/', getReceipts);
router.post('/', createReceipt);
router.post('/:id/confirm', confirmReceipt);
router.post('/:id/cancel', cancelReceipt);

module.exports = router;
