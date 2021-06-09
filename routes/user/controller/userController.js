// instantiate hash and salt for passwords
const bcrypt = require("bcryptjs");
//makes the model schema available for creating 
//new users in the database/communicates with database.
const User = require("../model/User");
//instantiates jwt for creating tokens
const jwt = require("jsonwebtoken");
const { estimatedDocumentCount } = require("../model/User");
//
async function signup(req, res) {
  //est. variables to store from req.body (deconstruction mode)
  const { username, email, password, firstName, lastName } = req.body;
  //The res.locals object has properties that are local variables within the application, lasts duration of the request.
  const { errorObj } = res.locals;
  console.log(Object.keys(errorObj));
  console.log(Object.keys(errorObj).length);
  //As long as there's no errors, proceed(try) 
  //and if not, respond with the errors. The errors are stored in 
  //the express 
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
    //instantiates salt and hash functions, 
    //part of bycrypt middleware/utility
    //salt number increases, so does the time/length
    //of salt.
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.password, salt);
    //creates a new user using variables created above
    //the values are from req.body and bycript
    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    //saves created user info and catches possible error
    //responds with a json 
    let savedUser = await createdUser.save();
    res.json({ message: "success", data: savedUser });
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}
async function login(req, res) {
  ////est. variables to store from req.body (deconstruction mode)
  const { email, password } = req.body;
  //bring in the express variable(good for length of request)
  const { errorObj } = res.locals;
  //stops app if errors and returns json
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  //if no errors proceed to find email in database to match
  try {
    let foundUser = await User.findOne({ email: email });
    //if falsy value for foundUser(no user found undefined)
    //respond with error json
    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
      //if email is found in DB, compare the password to the one in DB
      let comparedPassword = await bcrypt.compare(password, foundUser.password);
      //if falsy value for foundUser(no user found undefined)
      //respond with error json
      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        //jwt token helps define who we are/alt to cookies
        //cookies was a bit much for server to handle
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
           process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1d",
          }
        );
        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}
module.exports = { signup, login };