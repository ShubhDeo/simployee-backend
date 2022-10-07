const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: [Task],
  },
});

module.exports = mongoose.model("User", UserSchema);
