const express = require("express");
const { uploadFile } = require("../../middlewares/multer");
const router = express.Router();
const workOrderController = require("../../controllers/workOrderController");

router
  .route("/")
  .get(workOrderController.getAllWorkOrder)
  .post(workOrderController.createWorkOrder);

router
  .route("/upload-file")
  .post(uploadFile.single("file"), workOrderController.uploadOrder);

router
  .route("/:id")
  .get(workOrderController.getOneWorkOrder)
  .delete(workOrderController.deleteOneWorkOrder);

module.exports = router;
