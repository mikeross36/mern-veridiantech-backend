"use strict";
const mainController = require("./mainController");
const User = require("../models/userModel");
const multer = require("multer");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

exports.getAllUsers = mainController.getAll(User);
exports.getUser = mainController.getOne(User);
exports.updateUser = mainController.updateOne(User);
exports.deleteUser = mainController.deleteOne(User);

exports.getUserProfile = function (req, res, next) {
  req.params.id = req.user._id;
  next();
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(res.status(400).json({ message: "File is not an image!" }), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: imageFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = asyncHandler(async function (req, res, next) {
  if (!req.file) return next();
  req.file.filename = `user=${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize()
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);
});

function filterObj(obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach(function (key) {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

exports.updateUserAccount = asyncHandler(async function (req, res) {
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    return res.status(400).json({ message: "User update failed!" });
  }
  return res.status(200).json({ status: "success", updatedUser });
});
