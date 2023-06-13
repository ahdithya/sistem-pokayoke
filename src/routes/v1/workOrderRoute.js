const express = require("express");
const { uploadFile } = require("../../middlewares/multer");
const router = express.Router();
const workOrderController = require("../../controllers/workOrderController");
const { authJWT } = require("../../middlewares/auth");

router.route("/").get().post(authJWT, workOrderController.createWorkOrder);

router
  .route("/upload-file")
  .post(uploadFile.single("file"), workOrderController.uploadOrder);

router.route("/:id").get().put().delete();

module.exports = router;
