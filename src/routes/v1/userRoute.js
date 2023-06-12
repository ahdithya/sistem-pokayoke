const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const { authJWT, adminOnly } = require("../../middlewares/auth");

router
  .route("/")
  .get(authJWT, adminOnly, userController.getAllUser)
  .post(userController.CreateUser);

router.route("/login").post(userController.loginUser);

router.route("/:id").get().put().delete();

module.exports = router;
