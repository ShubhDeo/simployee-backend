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
      let user = await User.findById(req.user._id).populate("tasks").exec();
      let task = new Task({
        user: user._id,
        description,
        timeTaken,
      });

      const createdTask = await task.save();

      user.tasks.push(createdTask);

      await user.save();

      console.log(user);
      res.json(createdTask);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// @desc fetch a task
// @route GET /api/task/fetch/:user_id
// @access Protected route
const fetchTask = asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id);

    if (!user) {
      res.status(404).send("User not found");
      return;
    } else {
      res.status(200).json(user.tasks);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// @desc delete a task
// @route DELETE /api/task/delete/:task_id
// @access Protected route
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).send("Task not found");
      return;
    } else {
      const user = await User.findById(req.user._id);
      await task.remove();
      let filteredTasks = [];
      user.tasks.map((task) => {
        if (task._id !== id) {
          filteredTasks.push(task);
        }
      });
      user.tasks = filteredTasks;
      await user.save();
      res.status(200).send("Task deleted successfully");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { addTask, fetchTask, deleteTask };
