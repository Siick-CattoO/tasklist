import { React, useState } from "react";

// AXIOS
import axios from "axios";

// ICONS
import trash from "../assets/trash.svg";
import pen from "../assets/pen.svg";

export default function ListItem({ task, list, setList, id }) {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState("");

  //

  const handleDelete = async () => {
    //
    // TRY CATCH
    try {
      const response = await axios.delete(`tasks/${id}`);

      const filteredList = list.filter((element) => {
        return element._id != id;
      });
      console.log({ filteredList });
      setList(filteredList);
    } catch (error) {
      console.log(error);
    }
  };

  //
  // CLICK HANDLER

  const handleEditClick = () => {
    setEdit(true);
    setNewTask(task);
  };

  //
  //
  // EDIT HANDLER
  const handleEdit = async () => {
    if (newTask !== "") {
      //
      // TRY CATCH
      try {
        const res = await axios.put(`tasks/${id}`, {
          task: newTask,
        });

        const updateTaskId = list.findIndex((element) => element._id === id);
        const updatedTaskItem = (list[updateTaskId].task = newTaskD);
        setNewTask(updatedTaskItem);

        //
      } catch (error) {}

      const newList = list.map((element) => {
        if (element === task) return newTask;
        return element;
      });

      console.log({ newList });
      setList(newList);
      setNewTask("");
    } else {
alert("Bitte fügen sie Informationen ins Edit-Feld ein!")
setEdit(true);

    }
  };

  return (
    <>
      <li>
        {task}
        <div className="imageWrapper">
          <img
            src={pen}
            onClick={handleEditClick}
            alt=""
          />
          <img
            src={trash}
            onClick={handleDelete}
            alt=""
          />
        </div>
      </li>
      {edit ? (
        <div className="editWrapper">
          <input
            className="editTask"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button onClick={handleEdit}>OK</button>
        </div>
      ) : null}
    </>
  );
}
