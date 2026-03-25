const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  net: String,
  day: String,
});

module.exports = { PositionsSchema };