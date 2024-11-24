const Promotion = require('../models/Promotion');

const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPromotion = async (req, res) => {
  const { title, description, startDate, endDate } = req.body;
  try {
    const promotion = new Promotion({ title, description, startDate, endDate });
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

const updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate } = req.body;
  try {
    const promotion = await Promotion.findByIdAndUpdate(id, { title, description, startDate, endDate }, { new: true });
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
    res.status(200).json(promotion);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

const deletePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByIdAndDelete(id);
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
    res.status(200).json({ message: 'Promotion deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getOnePromotion = async (req, res) => {
  try {
    const promotionId = req.params.id;
    const promotion = await Promotion.findById(promotionId); 

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion Not found' });
    }

    res.json(promotion); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getPromotions, createPromotion, updatePromotion, deletePromotion, getOnePromotion };
