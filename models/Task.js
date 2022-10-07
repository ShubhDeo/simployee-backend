const mongoose = require("mongoose");
const { v4 } = require("uuid");

const TaskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  description: {
    type: String,
    max: 80,
    require: true,
  },
  startTime: { type: Date, default: Date.now },
  timeTaken: {
    type: String, //Minutes
    require: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Task", TaskSchema);