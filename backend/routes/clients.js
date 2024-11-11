const express = require('express');
const router = express.Router();
const { getAllClients, createClient, updateClient, deleteClient, getClient } = require('../controllers/clientsController'); // виправлено імпорт функції

router.get('/', getAllClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/:id', getClient)

module.exports = router;
