const { User } = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// @desc Auth the user & get the token
// @route POST /api/login
// @access Public route
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  const user = await User.findOne({ email });

  if (!user || !user.isActivated) {
    res.status(401).json({
      error: "Invalid Credentials",
    });
  }

  console.log(user);

  const isValid = bcrypt.compareSync(password, user.password);

  if (isValid) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      contact: user.contact,
      joiningDate: user.joiningDate,
      department: user.department,
      isAdmin: user.isAdmin,
      isActivated: user.isActivated,
      tasks: user.tasks,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send("Invalid password");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user || !user.isActivated) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

const addUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    contact,
    joiningDate,
    department,
    isAdmin,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).send("User already exists");
    }

    const user = await User.create({
      username,
      email,
      password,
      contact,
      joiningDate,
      department,
      isAdmin,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        contact: user.contact,
        joiningDate: user.joiningDate,
        department: user.department,
        isAdmin: user.isAdmin,
        isActivated: user.isActivated,
        tasks: user.tasks,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send("Invalid user data");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, password, contact, joiningDate, department } =
    req.body;

  try {
    const user = await User.findById(id);

    if (!user || !user.isActivated) {
      res.status(404).send("User not found");
      return;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.contact = contact || user.contact;
    user.joiningDate = joiningDate || user.joiningDate;
    user.department = department || user.department;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      contact: updatedUser.contact,
      joiningDate: updatedUser.joiningDate,
      department: updatedUser.department,
      isAdmin: updatedUser.isAdmin,
      isActivated: updatedUser.isActivated,
      tasks: updatedUser.tasks,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

const deactivateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user || !user.isActivated) {
      res.status(404).send("User not found");
    } else {
      user.isActivated = false;
      await user.save();
      res.status(200).send("User deactivated.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = { authUser, getUser, addUser, updateUser, deactivateUser };
