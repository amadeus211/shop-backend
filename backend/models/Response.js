const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('Response', ResponseSchema); 
