"use strict";
const mongoose = require("mongoose");
const slugify = require("slugify");

const droneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    flightTime: {
      type: String,
      required: true,
    },
    cruisingSpeed: String,
    vehicleMass: String,
    maxPayloadMass: String,
    flightRange: String,
    operatingDifficulty: {
      type: String,
      required: true,
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty levels are: easy, medium, difficult",
      },
    },
    slug: String,
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: [String],
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
      required: true,
    },
    pilots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamp: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

droneSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "drone",
  localField: "_id",
});

droneSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

droneSchema.pre(/^find/, function (next) {
  this.populate({
    path: "pilots",
    select: "-_v",
  });
  next();
});

const Drone = mongoose.model("Drone", droneSchema);

module.exports = Drone;
