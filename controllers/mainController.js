"use strict";
const asyncHandler = require("express-async-handler");

exports.getAll = function (Model) {
  return asyncHandler(async function (req, res) {
    const record = await Model.find();
    if (!record) {
      return res.status(404).json({ message: `${record} not found!` });
    }
    res.status(200).json(record);
  });
};

exports.getOne = function (Model, populateOptions) {
  return asyncHandler(async function (req, res) {
    let query = await Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const record = await query;
    if (!record) {
      return res.status(404).json({ message: `${record} not found!` });
    }
    return res.status(200).json(record);
  });
};

exports.createOne = function (Model) {
  return asyncHandler(async function (req, res) {
    const record = await Model.create(req.body);
    if (!record) {
      return res.status(400).json({ message: "Invalid data passed!" });
    }
    return res.status(201).json({ status: "success", record: record });
  });
};

exports.updateOne = function (Model) {
  return asyncHandler(async function (req, res) {
    const record = await Model.findByIdAndUpdate(req.params.id, req.body);
    if (!record) {
      return res.status(400).json({ message: `Failed to update ${record}` });
    }
    return res.status(200).json({ status: "success", record });
  });
};

exports.deleteOne = function (Model) {
  return asyncHandler(async function (req, res) {
    const record = await Model.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(400).json({ message: `Failed to delete ${record}` });
    }
    return res.status(200).json(null);
  });
};
