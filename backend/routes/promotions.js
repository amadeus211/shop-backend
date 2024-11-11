const express = require('express');
const router = express.Router();
const { getPromotions, createPromotion, updatePromotion, deletePromotion, getOnePromotion } = require('../controllers/promotionsController');

router.get('/', getPromotions);

router.post('/', createPromotion);

router.put('/:id', updatePromotion);

router.delete('/:id', deletePromotion);

router.get('/:id', getOnePromotion);

module.exports = router;
