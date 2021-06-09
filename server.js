// brings in mongoose which is the driver for mongodb
const mongoose = require("mongoose");
//establishes when called upon as the entry point
//for requests to the app/server
const app = require("./app");
//est. what port our server is on/listening
const port = 3000;
//Line 5- Makes it possible to hide passwords 
//and other sensitive information
//that is stored in a variable in a  ".env" 
//file (root folder)can be hidden from github.
require("dotenv").config();
//starts the server and defines the schema type
mongoose
   //First, make sure we are connected to the database.
  .connect(process.env.MONGO_DB, {
    //below two lines are the option flags. With out there will be errors
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //Then turn the server on.
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });