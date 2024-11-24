const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createClient = async (req, res) => {
  const { name, phoneNumber, password, bonusPoints } = req.body;
console.log("123");

  try {
    const newClient = new Client({
      name,
      phoneNumber,
      password,
      bonusPoints,
    });

    console.log("234");
    
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("345");
    
  }
};

exports.deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: `Client with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, password, bonusPoints } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, phoneNumber, password, bonusPoints },
      { new: true }
    );
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getClient = async (req, res) => {
    try {
      const clientId = req.params.id;
      const client = await Client.findById(clientId); 
  
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
  
      res.json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
