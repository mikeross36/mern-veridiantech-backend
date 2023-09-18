"use strict";
const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.tokenProtect,
    authController.restrictTo("admin", "user", "pilot"),
    reviewController.setDroneUserIds,
    reviewController.createReview
  );

router.use(authController.tokenProtect);
router
  .route("/:reviewId")
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo("admin", "user", "pilot"),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo("admin", "user", "pilot"),
    reviewController.deleteReview
  );

module.exports = router;
