const express = require('express');
const router = express.Router();
const { getAllResponses, createResponce, deleteResponce } = require('../controllers/responseController');

router.get('/', getAllResponses);
router.delete('/:id', deleteResponce);
router.post('/', createResponce);

module.exports = router;
