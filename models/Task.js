const mongoose = require("mongoose");
const { v4 } = require("uuid");
<<<<<<< HEAD
const User = require('./User')
=======
>>>>>>> shubh

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
<<<<<<< HEAD
  startTime: {
    type: Date,
    default: Date.now,
  },
=======
  startTime: { type: Date, default: Date.now },
>>>>>>> shubh
  timeTaken: {
    type: String, //Minutes
    require: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

<<<<<<< HEAD
module.exports = mongoose.model("Task", TaskSchema);
=======
module.exports = mongoose.model("Task", TaskSchema);
>>>>>>> shubh
