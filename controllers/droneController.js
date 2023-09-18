"use strict";
const mainController = require("./mainController");
const Drone = require("../models/droneModel");
const asyncHandler = require("express-async-handler");

exports.getAllDrones = mainController.getAll(Drone);
exports.getDrone = mainController.getOne(Drone, { path: "reviews" });
exports.createDrone = mainController.createOne(Drone);
exports.updateDrone = mainController.updateOne(Drone);
exports.deleteDrone = mainController.updateOne(Drone);

exports.searchDrones = asyncHandler(async function (req, res) {
  function querySearch() {
    return req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            {
              operatingDifficulty: { $regex: req.query.search, $options: "i" },
            },
            { vehicleMass: { $regex: req.query.search, $options: "i" } },
            { flightTime: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  }
  const drones = await Drone.find(querySearch());
  if (!drones) {
    return res
      .status(404)
      .json({ message: "No search results on search term!" });
  }
  return res.status(200).json(drones);
});
