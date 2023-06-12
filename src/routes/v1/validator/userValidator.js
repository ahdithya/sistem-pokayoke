const { body, param } = require("express-validator");

const createUser = [
  body("name")
    .exists()
    .withMessage("name is Required!")
    .isString()
    .withMessage("Part Nomor must be a string!")
    .isLength({ max: 3 })
    .withMessage("Part Nomor must be maximal 3 character!"),
  body("username")
    .exists()
    .withMessage("Part Name is Required!")
    .isLength({ max: 5 })
    .withMessage("Part Name must be maximal 5 character!"),
];
