const express = require("express");
const router = express.Router();
const partController = require("../../controllers/partController");
const {
  getOnePartValidator,
  createOnePartValidator,
  updateOnePartValidator,
  deleteOnePartValidator,
} = require("./validator/partValidator");

router
  .route("/")
  .get(partController.getAllPart)
  .post(createOnePartValidator, partController.createOnePart);

router
  .route("/:id")
  .get(getOnePartValidator, partController.getOnePart)
  .put(updateOnePartValidator, partController.updateOnePart)
  .delete(deleteOnePartValidator, partController.deleteOnePart);

module.exports = router;
