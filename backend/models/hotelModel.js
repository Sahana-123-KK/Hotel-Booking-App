const mongoose = require("mongoose");

const hotelModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: { type: String, required: true },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrize: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Hotels", hotelModel);
