"use strict";
const express = require("express");
const router = express.Router();
const droneController = require("../controllers/droneController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

router.use("/:droneId/reviews", reviewRouter);

router.get("/search-drones", droneController.searchDrones);

router
  .route("/")
  .get(droneController.getAllDrones)
  .post(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    droneController.createDrone
  );

router
  .route("/:id")
  .get(droneController.getDrone)
  .patch(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    droneController.updateDrone
  )
  .delete(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    droneController.deleteDrone
  );

module.exports = router;
