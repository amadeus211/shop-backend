const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const APIError = require('../errors/apiError');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bonusPoints: { type: Number, default: 0 },
  pendingPoints: [{
    pointsToAdd: {
      type: Number, default: 0
    },
    pointsToUse: {
      type: Number, default: 0
    },
    receiptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receipt',
      required: true
    },
  }]
});

ClientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ClientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

ClientSchema.methods.updatePendingBonusPoints = async function (receipt, session) {
  const point = this.pendingPoints?.find(p => p.receiptId === receipt._id.toString());
  if (point) {
    point.pointsToAdd = receipt.bonusIncrement;
    point.pointsToUse = receipt.bonusUsed;
  } else {
    this.pendingPoints.push({
      pointsToAdd: receipt.bonusIncrement,
      pointsToUse: receipt.bonusUsed,
      receiptId: receipt._id,
    });
  }

  return await this.save({ session });
};

ClientSchema.methods.confirmPendingBonusPoints = async function (receiptId, session) {
  const point = this.pendingPoints?.find(p => p.receiptId.toString() === receiptId.toString());
  if (!point) {
    return;
  }
  
  if ((this.bonusPoints - point.pointsToUse) < 0) {
    throw new APIError(400, 'Not enough points to use');
  }

  this.bonusPoints -= point.pointsToUse;
  
  this.bonusPoints += point.pointsToAdd;
  this.pendingPoints = this.pendingPoints.filter(p => p.receiptId.toString() !== receiptId.toString());

  return await this.save({ session });
};

ClientSchema.methods.cancelPendingBonusPoints = async function (receiptId, session) {
  this.pendingPoints = this.pendingPoints.filter(p => p.receiptId.toString() !== receiptId.toString());

  return await this.save({ session });
};

module.exports = mongoose.model('Client', ClientSchema);
