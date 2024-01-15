const express = require("express");
const router = express.Router();
const  adminController=require("../controllers/admin-controller");
const authMiddleware =require("../midddleware/authMiddleware");
const adminMiddleware=require("../midddleware/adminMiddleware");

router.route("/users").get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteUserById);
router.route("/users/:id").get(authMiddleware,adminMiddleware,adminController.getUserById);
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminController.updateUserById);
router.route("/contacts").get(authMiddleware,adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware,adminController.deleteContactById);
module.exports = router;