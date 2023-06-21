const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const { auth, adminOnly } = require("../../middlewares/auth");

router
  .route("/")
  .get(auth, adminOnly, userController.getAllUser)
  .post(userController.CreateUser);

router.route("/login").post(userController.loginUser);

router
  .route("/:id")
  .get()
  .put()
  .delete(auth, adminOnly, userController.deleteUser);

module.exports = router;
