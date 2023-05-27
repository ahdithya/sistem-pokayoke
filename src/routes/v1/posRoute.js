const express = require("express");
const router = express.Router();
const posController = require("../../controllers/posController");
const {
  getOnePosValidator,
  createOnePosValidator,
} = require("./validator/posValidator");

router
  .route("/")
  .get(posController.getAllPos)
  .post(createOnePosValidator, posController.createOnePos);

router
  .route("/:id")
  .get(getOnePosValidator, posController.getOnePos)
  .put(posController.updateOnePos)
  .delete(posController.deleteOnePos);

module.exports = router;
