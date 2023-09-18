"use strict";
const mongoose = require("mongoose");
const slugify = require("slugify");

const featuredSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 40,
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
        message: "Difficult levels are: easy, medium, difficult",
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
      default: 3,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

featuredSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// featuredSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "featured",
//   localField: "_id",
// });

const Featured = mongoose.model("Featured", featuredSchema);

module.exports = Featured;
