import express from "express";

// eigene Imports
import {
  createTaskController,
  getAllTasksController,
  updateTaskController,
  deleteTaskController,
  deleteAllTasksController,
} from "../constrollers/taskControllers.js";

//
//
// Der Router wird uns helfen unsere Tasks zu verwahren:
const taskRouter = express.Router();

//;
//; ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GET ALL TASKS
taskRouter.get("/", getAllTasksController);

//:
//: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POST  ==  CREATE
taskRouter.post("/", createTaskController);

//.
//. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UPDATE A TASK
taskRouter.put("/:taskId", updateTaskController);

//>
//> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DELETE A TASK
taskRouter.delete("/:taskId", deleteTaskController);

//!
//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DELETE ALL !!!
taskRouter.delete("/", deleteAllTasksController);


//+
//+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EXPORTS
export default taskRouter;
