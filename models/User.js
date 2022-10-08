const mongoose = require("mongoose");
const { v4 } = require("uuid");

const TaskSchema = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  description: {
    type: String,
    max: 80,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  timeTaken: {
    type: String, //Minutes
    required: true,
  },
  taskType: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  department: {
    type: Number, //enums
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: true,
  },
  tasks: [TaskSchema],
});

const User = mongoose.model("User", UserSchema);
const Task = mongoose.model("Task", TaskSchema);
module.exports = { User, Task };
