const { body, param } = require("express-validator");
// const { v4: uuidv4 } = require("uuid");

const getOnePartValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .isUUID()
    .withMessage("Invalid Id"),
];

const createOnePartValidator = [
  body("name")
    .exists()
    .withMessage("Nama is Required!")
    .isString()
    .withMessage("Nama must be a string!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama must be at least 3 and under 100 characters long!"),
  body("description")
    .exists()
    .withMessage("description is Required!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama must be at least 3 and under 100 characters long!"),
];

const updateOnePartValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .isUUID()
    .withMessage("Invalid Id"),
  body("name")
    .exists()
    .withMessage("Nama is Required!")
    .isString()
    .withMessage("Nama must be a string!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama must be at least 3 and under 100 characters long!"),
  body("description")
    .exists()
    .withMessage("description is Required!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama must be at least 3 and under 100 characters long!"),
];

const deleteOnePartValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .isUUID()
    .withMessage("Invalid Id"),
];

module.exports = {
  getOnePartValidator,
  createOnePartValidator,
  updateOnePartValidator,
  deleteOnePartValidator,
};
