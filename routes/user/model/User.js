//This is the model part of MVC, used as a 
//template for storing data in the server
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});
module.exports = mongoose.model("user", userSchema);