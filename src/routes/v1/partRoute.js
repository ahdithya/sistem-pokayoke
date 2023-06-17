const express = require("express");
const router = express.Router();
const partController = require("../../controllers/partController");
const { adminOnly } = require("../../middlewares/auth");
const {
  getOnePartValidator,
  createOnePartValidator,
  updateOnePartValidator,
  deleteOnePartValidator,
} = require("./validator/partValidator");

router
  .route("/")
  .get(partController.getAllPart)
  .post(adminOnly, createOnePartValidator, partController.createOnePart);

router
  .route("/:id")
  .get(getOnePartValidator, partController.getOnePart)
  .put(adminOnly, updateOnePartValidator, partController.updateOnePart)
  .delete(adminOnly, deleteOnePartValidator, partController.deleteOnePart);

module.exports = router;
