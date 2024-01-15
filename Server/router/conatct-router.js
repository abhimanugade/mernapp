const express = require("express");
const router = express.Router();
const contactForm=require("../controllers/contact-controller")
const validate = require("../midddleware/validate-middleware");
const {contactSchema} =require("../validator/contact-validator");
router.use(express.json());


router.route("/contact").post(validate(contactSchema),contactForm);

module.exports = router;
