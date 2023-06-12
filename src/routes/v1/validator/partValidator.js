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
  body("part_no")
    .exists()
    .withMessage("Part Nomor is Required!")
    .isString()
    .withMessage("Part Nomor must be a string!")
    .isLength({ max: 3 })
    .withMessage("Part Nomor must be maximal 3 character!"),
  body("part_name")
    .exists()
    .withMessage("Part Name is Required!")
    .isLength({ max: 5 })
    .withMessage("Part Name must be maximal 5 character!"),
];

const updateOnePartValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .isUUID()
    .withMessage("Invalid Id"),
  body("part_no")
    .exists()
    .withMessage("Part Nomor is Required!")
    .isString()
    .withMessage("Part Nomor must be a string!")
    .isLength({ max: 3 })
    .withMessage("Part Nomor must be must be maximal 3 character!"),
  body("part_name")
    .exists()
    .withMessage("Part Name is Required!")
    .isLength({ max: 5 })
    .withMessage("Part Name must be must be maximal 5 character!"),
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
