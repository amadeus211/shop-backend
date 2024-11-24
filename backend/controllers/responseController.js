const Response = require('../models/Response'); 

exports.getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find(); 
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createResponce = async (req, res) => {
  const { description, phoneNumber } = req.body;
  console.log("123");

  try {
    const newResponse = new Response({  
      description,
      phoneNumber
    });

    console.log("234");
    
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("345");
  }
};

exports.deleteResponce = async (req, res) => {
  const { id } = req.params;

  try {
    await Response.findByIdAndDelete(id); 
    res.status(200).json({ message: `Responce with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
