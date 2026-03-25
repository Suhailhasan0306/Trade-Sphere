const mongoose = require("mongoose");

const { PositionsSchema } = require("../Schemas/PositionsSchema");

const PositionsModel = mongoose.model("Position", PositionsSchema);

module.exports = { PositionsModel };