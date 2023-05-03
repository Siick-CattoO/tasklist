// importiere von Model:
import taskModel from "../models/taskModel.js";

//;
//;
//; ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GET ALL TASKS
async function getAllTasksController(req, res) {
  try {
    const allTaskItems = await taskModel.find({});
    res.status(200).json(allTaskItems);
  } catch (error) {
    res.json(error);
  }
}

//:
//:
//: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POST  ==  CREATE
// da es jetzt mit MongoDB arbeitet ist es eine externe Quelle, daher async await:
async function createTaskController(req, res) {
  console.log(req.body);
  try {
    const newTask = taskModel({
      task: req.body.task,
    });

    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.json(error);
  }
}


//.
//.
//. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UPDATE A TASK
async function updateTaskController(req, res) {
  const updateId = req.params.taskId;
  try {
    const updatedItem = await taskModel.findByIdAndUpdate(
      updateId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.json(error);
  }

  // console.log(req.params.taskId);
  // res.send(req.params.taskId)
}

//>
//>
//> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DELETE A TASK
async function deleteTaskController(req, res) {
    const deleteId = req.params.taskId;
    try {
        await taskModel.findByIdAndDelete(deleteId);
        res.status(200).json("Task GELÖSCHT!");
    } catch (error) {
        res.json(error);
      }
}

//!
//!
//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DELETE ALL !!!
async function deleteAllTasksController(req, res) {
    try {
        await taskModel.deleteMany({});
        res.status(200).json("ALLE Tasks wurden GELÖSCHT!!!");
    } catch (error) {
        res.json(error);
      }
}


//+
//+
//+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EXPORTS
export {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  deleteAllTasksController,
};
