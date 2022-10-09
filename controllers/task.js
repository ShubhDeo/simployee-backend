const { User, Task } = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc add a task
// @route POST /api/task/add
// @access Protected route
const addTask = asyncHandler(async (req, res) => {
  let { description, startTime, timeTaken, taskType } = req.body;
  startTime=new Date(startTime);
  const month=startTime.getMonth();
  const date=startTime.getDate()+1;
  const year=startTime.getFullYear();
  startTime=new Date(year,month,date);
  startTime.setUTCHours(0,0,0,0);
  //console.log(date,month,year);
  try {
    if (description.length > 80 || description.length === 0 || !timeTaken) {
      res.status(400).send("Invalid Input, Cannot add task");
      return;
    } else {
      let user = await User.findById(req.user._id).populate("tasks").exec();
      // console.log(user)
      let task = new Task({
        user: user._id,
        description,
        timeTaken,
        taskType,
        startTime
      });

      const createdTask = await task.save();

      // console.log(createdTask);

      user.tasks.push(createdTask);

      console.log(user);

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


const fetchTaskByDate = asyncHandler(async (req, res) => {
  let { user_id,date } = req.params;
  date=new Date(date);
  date.setUTCHours(0,0,0,0);

  try {
    console.log(new Date(Date.now() - 7* 60 * 60 * 24 * 1000));
    const tasks = await Task.find({
      user: user_id, 
      startTime: {
        //'$lte': Date.now(),
        '$eq': date
        //'$lte': Date.now()
      }
    });

    if (tasks.length==0) {
      res.status(404).send("Tasks not found");
      return;
    } else {
       res.status(200).json(tasks);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


const fetchTaskByWeek = asyncHandler(async (req, res) => {
  let { user_id } = req.params;
  let date=new Date(Date.now() - 7* 60 * 60 * 24 * 1000);
  date.setUTCHours(0,0,0,0);

  try {
    //console.log(new Date(Date.now() - 7* 60 * 60 * 24 * 1000));
    const tasks = await Task.find({
      user: user_id, 
      startTime: {
        //'$lte': Date.now(),
        '$gte': date
        //'$lte': Date.now()
      }
    });

    if (tasks.length==0) {
      res.status(404).send("Tasks not found");
      return;
    } else {
       res.status(200).json(tasks);
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

module.exports = { addTask, fetchTask, deleteTask, fetchTaskByDate,fetchTaskByWeek };
