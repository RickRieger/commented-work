//bring in express
const express = require("express");
// express. Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests
const router = express.Router();
//below stores functions and their folder pathways 
//inside of variables to be used during the sign in 
//and create new user requests.
const { signup, login } = require("./controller/userController");
const checkIsUndefined = require("./helpers/checkIsUndefined");
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");
const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");

//when url ends with /signup and it's a post req,
//all these functions are used to complete the process
//any errors are caught in the res.locals object variable 
//and returned in the controller before code is executed
router.post(
  "/sign-up",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);
//when url ends with "/login" and it's a post req,
//all these functions are used to complete the process
//any errors are caught in the res.locals object variable 
//and returned in the controller before code is executed
router.post(
  "/login",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);
//makes this file accessible to other files
module.exports = router;