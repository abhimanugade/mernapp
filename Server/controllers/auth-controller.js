const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("home page");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  // console.log(req.body);

  try {
    const { userName, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      userName,
      email,
      phone,
      password: hash_password,
    });
    res.status(201).json({
      msg: "User Registration successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "internal server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({
        msg: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server Error" });
  }
};


const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    //console.log(userData);
    return res.status(200).json({userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login,user };
