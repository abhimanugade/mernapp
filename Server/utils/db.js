const mongoose = require("mongoose");


const URI =
  process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
   // console.log(URI);
    console.log("connection successfully to database ");
  } catch (error) {
    console.log(error)
    console.error("database connecton failed");
    process.exit(0);
  }
};

module.exports = connectDb;
