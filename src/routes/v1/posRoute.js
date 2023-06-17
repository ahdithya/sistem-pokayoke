const express = require("express");
const router = express.Router();
const posController = require("../../controllers/posController");
const {
  getOnePosValidator,
  createOnePosValidator,
} = require("./validator/posValidator");
const { authJWT, adminOnly } = require("../../middlewares/auth");
router
  .route("/")
  .get(posController.getAllPos)
  .post(adminOnly, createOnePosValidator, posController.createOnePos);

router
  .route("/:id")
  .get(getOnePosValidator, posController.getOnePos)
  .put(adminOnly, posController.updateOnePos)
  .delete(adminOnly, posController.deleteOnePos);

module.exports = router;
