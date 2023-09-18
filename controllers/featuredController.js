"use strict";
const Featured = require("../models/featuredModel");
const mainController = require("./mainController");

exports.getAllFeatured = mainController.getAll(Featured);
exports.getFeatured = mainController.getOne(Featured, { path: "reviews" });
exports.createFeatured = mainController.createOne(Featured);
exports.updateFeatured = mainController.updateOne(Featured);
exports.deleteFeatured = mainController.deleteOne(Featured);
