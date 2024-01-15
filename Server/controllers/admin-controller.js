const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select({
      password: 0,
    });
    if (!users) {
      res.status(404).json({ message: "No users found" });
      return;
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
    next(error);
  }
};
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    //console.log(contacts);
    if (!contacts) {
      res.status(404).json({ message: "No contacts found" });
      return;
    }
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
    next(error);
  }
};

const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;

    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
    next(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;

    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
    next(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }).select({
      password: 0,
    });
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
    next(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = req.body;

    const updatedData = await User.updateOne({ _id: id }, { $set: data });
    return res
      .status(200)
      .json({ message: "User Updated Successfully", updatedData });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById
};
