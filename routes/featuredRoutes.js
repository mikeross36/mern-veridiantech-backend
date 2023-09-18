"use strict";
const express = require("express");
const router = express.Router();
const featuredController = require("../controllers/featuredController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(featuredController.getAllFeatured)
  .post(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    featuredController.createFeatured
  );

router
  .route("/:id")
  .get(featuredController.getFeatured)
  .patch(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    featuredController.updateFeatured
  )
  .delete(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    featuredController.deleteFeatured
  );

module.exports = router;
