const Services = require("../models/service-model");
const services = async (req, res) => {
  try {
    
    const response = await Services.find();
    if(!response){
        res.status(404).json({ message: "No service found" });
        return;
    }
    res.status(200).json({msg:response });
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
  }
};
module.exports = services;
