const { User, Task } = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc add a task
// @route POST /api/task/add
// @access Protected route
const addTask = asyncHandler(async (req, res) => {
  const { description, startTime, timeTaken } = req.body;

  try {
    if (description.length > 80 || description.length === 0 || !timeTaken) {
      res.status(400).send("Invalid Input, Cannot add task");
      return;
    } else {
      let user=await User.findById(req.user._id).populate("tasks").exec();
      let task=new Task({
        user:user._id,
        description,
        timeTaken
      })

      const createdTask=await task.save();

      user.tasks.push(createdTask);

      await user.save();

      console.log(user);
      res.json(createdTask);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

const fetchTask = asyncHandler(async (req, res) => {});

module.exports = { addTask, fetchTask };
