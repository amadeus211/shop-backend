const express = require('express');
const { getReceipts, createReceipt, confirmReceipt } = require('../controllers/receiptsController');
const router = express.Router();

router.get('/', getReceipts);
router.post('/', createReceipt);
router.post('/:id/confirm', confirmReceipt);

module.exports = router;
