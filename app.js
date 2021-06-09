//brings in express which is a framework that
//makes it easier to write code for the node environment.
const express = require("express");
//bring in morgan -a helper that generates request logs.
const morgan = require('morgan');
//call Express and assigns app variable to it
const app = express();
//defines the path for our routes and stores in a variable
const userRouter = require("./routes/user/userRouter")
//express uses morgan to log requests in terminal
app.use(morgan("dev"));
// is a built-in middleware function in Express. 
//It parses incoming requests with JSON payloads 
//and is based on body-parser.
app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({extended:false}));
//delivers a path to userRouter for http requests
app.use('/api/user', userRouter);
//makes this file accessible to other files
module.exports = app;