const { body, param } = require("express-validator");

const getOnePosValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .isUUID()
    .withMessage("Invalid Id"),
];

const createOnePosValidator = [
  body("pos")
    .exists()
    .withMessage("Pos is Required!")
    .isNumeric()
    .withMessage("Pos must be a Integer!")
    .isLength({ max: 3 })
    .withMessage("Pos must be at maximal 3 "),
  body("description")
    .exists()
    .withMessage("description is Required!")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "description must be at least 3 and under 100 characters long!"
    ),
];

module.exports = { getOnePosValidator, createOnePosValidator };
