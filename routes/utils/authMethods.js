//bring in the variables needed to validate 
//from the middleware "validator"
const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator");
const checkIsEmpty = (target) => (isEmpty(target) ? true : false);
const checkIsStrongPassword = (password) => (isStrongPassword(password) ? true : false);
const checkIsEmail = (email) => (isEmail(email) ? true : false);
const checkIsAlpha = (target) => (isAlpha(target) ? true : false);
const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false);
module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
};



// const { isEmpty, isStrongPassword } = require("validator");
// function checkIsEmpty(target) {
//   //write you own logic
//   if (isEmpty(target)) {
//     return true;
//   } else {
//     return false;
//   }
// }
// function checkIsStrongPassword(password) {
//   if (!isStrongPassword(password)) {
//     return true;
//   } else {
//     return false;
//   }
// }
// module.exports = {
//   checkIsEmpty,
//   checkIsStrongPassword,
// };