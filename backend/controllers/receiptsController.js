const Receipt = require('../models/Receipt');
const ReceiptService = require('../services/receiptService');

const getReceipts = async (req, res) => {
  try {
    const clientId = req.query.clientId;
    let receipts;

    if (clientId) {
        receipts = await Receipt.findByClientId(clientId);
    } else {
        receipts = await Receipt.find();
    }

    res.status(200).json(receipts);
  } catch (error) {
    console.log(error);
    res.status(error.status ?? 500).json({ message: error.responseMessage ?? 'Server error' });
  }
};

const createReceipt = async (req, res) => {
  try {
    const receipt = await ReceiptService.saveReceipt(req.body);
    res.status(200).json(receipt);
  } catch (error) {
    console.log(error);
    res.status(error.status ?? 500).json({ message: error.responseMessage ?? 'Server error' });
  }
}

const confirmReceipt = async (req, res) => {
  const { id } = req.params;

  try {
    const receipt = await ReceiptService.confirmReceipt(id);
    res.status(200).json(receipt);
  } catch (error) {
    console.log(error);
    res.status(error.status ?? 500).json({ message: error.responseMessage ?? 'Server error' });
  }
}

const cancelReceipt = async (req, res) => {
  const { id } = req.params;

  try {
    const receipt = await ReceiptService.cancelReceipt(id);
    res.status(200).json(receipt);
  } catch (error) {
    console.log(error);
    res.status(error.status ?? 500).json({ message: error.responseMessage ?? 'Server error' });
  }
}

module.exports = { getReceipts, createReceipt, confirmReceipt, cancelReceipt };
