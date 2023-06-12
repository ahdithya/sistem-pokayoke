const express = require("express");
const router = express.Router();
const partController = require("../../controllers/partController");
const { authJWT } = require("../../middlewares/auth");
const {
  getOnePartValidator,
  createOnePartValidator,
  updateOnePartValidator,
  deleteOnePartValidator,
} = require("./validator/partValidator");

router
  .route("/")
  .get(authJWT, partController.getAllPart)
  .post(createOnePartValidator, partController.createOnePart);

router
  .route("/:id")
  .get(getOnePartValidator, partController.getOnePart)
  .put(updateOnePartValidator, partController.updateOnePart)
  .delete(deleteOnePartValidator, partController.deleteOnePart);

module.exports = router;
