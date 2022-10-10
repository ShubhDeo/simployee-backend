const express = require("express");
const taskRouter = express.Router();
const { addTask, fetchTask , deleteTask, fetchTaskByDate, fetchTaskByWeek } = require("../controllers/task");
const { protect } = require("../middlewares/authMiddleware");

taskRouter.route("/add").post(protect, addTask);
taskRouter.route("/fetch/:user_id").get(protect, fetchTask);
taskRouter.route("/:id").delete(protect, deleteTask);
taskRouter.route(`/fetch/week/:user_id`).get(protect,fetchTaskByWeek)
taskRouter.route(`/fetch/:user_id/:date`).get(protect, fetchTaskByDate);


module.exports = { taskRouter };
