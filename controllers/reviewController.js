"use strict";
const mainController = require("./mainController");
const Review = require("../models/reviewModel");

exports.setDroneUserIds = function (req, res, next) {
  if (!req.body.drone) req.body.drone = req.params.droneId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.getAllReviews = mainController.getAll(Review);
exports.getReview = mainController.getOne(Review);
exports.createReview = mainController.createOne(Review);
exports.updateReview = mainController.updateOne(Review);
exports.deleteReview = mainController.deleteOne(Review);
