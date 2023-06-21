const { body, param } = require("express-validator");

const createUserValidator = [
  body("name")
    .exists()
    .withMessage("name is Required!")
    .isString()
    .withMessage("Name must be a string!")
    .isLength({ min: 3 })
    .withMessage("Name must minimal 3 character!"),
  body("username")
    .exists()
    .withMessage("Username is Required!")
    .isLength({ min: 5 })
    .withMessage("Part Name must be minimal 5 character!"),
  body("password")
    .exists()
    .withMessage("Password is Required!")
    .isLength({ max: 8 })
    .withMessage("Password must be maximal 8 character!"),
  body("email")
    .exists()
    .withMessage("Email is Required!")
    .isEmail()
    .withMessage("Email must be a valid email address!"),
];

const getOneUserValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .isUUID()
    .withMessage("Invalid Id"),
];

const deleteUsertValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .isUUID()
    .withMessage("Invalid Id"),
];

module.exports = {
  createUserValidator,
  // getOneUserValidator,
  deleteUsertValidator,
};
