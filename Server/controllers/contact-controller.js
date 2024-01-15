const Contact = require("../models/contact-model");
const contactForm = async (req, res) => {
  try {
    const response = req.body;

   // console.log(req.body);
    if(response){
    await Contact.create(response);
    res.status(200).json({
      message: "message send successfully",
    });
  }
  else{
    res.status(500).json({
      message: "message not send",
    });
  }
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
  }
};
module.exports = contactForm;
