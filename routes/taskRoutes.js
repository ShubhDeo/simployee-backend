const express = require("express");
const taskRouter = express.Router();
const { addTask, fetchTask , deleteTask } = require("../controllers/task");
const { protect } = require("../middlewares/authMiddleware");

taskRouter.route("/add").post(protect, addTask);
taskRouter.route("/fetch/:user_id").get(protect, fetchTask);
taskRouter.route("/:id").delete(protect, deleteTask);


module.exports = { taskRouter };
