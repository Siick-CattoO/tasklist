import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

// Components
import ListItem from "./components/ListItem";

//:
//:
//: Verbindung mit der Server-Nummer:
const baseURL = "http://localhost:5080/tasks";
//:
//:

//
//
// useStates
function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  //:
  //:
  //: Testen ob die Serververbindung aufgebaut werden kann:
  const fetchTasks = async () => {
    try {
      // axios-Anruf durchführen:
      const response = await axios.get(baseURL);

      // Daten in Variable speichern:
      const data = response.data;

      // console.log(data);
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //:
  //:

  useEffect(() => {
    fetchTasks();
  }, []);

  //
  //
  // Vorschlag ~~> FETCH
  // Nebenwirkung von Fetch ist ein automatisches GET
  // aber um PUT, DELETE durchzuführen brauchen wir die Verbindung
  //

  //.
  //.
  //. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ NEW TASK HANDLER

  const handleNewTask = async (event) => {
    event.preventDefault();
    if (task === "") return;
    try {
      const response = await axios.post(baseURL, {
        task: task,
      });

      setList((prev) => [...prev, response.data]);
      // setList([...list, task])
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(list);

  //!
  //!
  //! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DELETE ALL HANDLER
  const deleteAll = async () => {
    try {
      await axios.delete(baseURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = (event) => {
    event.preventDefault();

    deleteAll();
    setList([]);
  };

  //~
  //~
  //~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RETURN
  return (
    <div className="app">
      <h1>Task List</h1>
      <form onSubmit={handleNewTask}>
        <label>
          Add a new task
          <input
            required={true}
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
        </label>
        <div className="buttonWrapper">
          <button>New Task</button>
          <button onClick={handleDeleteAll}>Delete</button>
        </div>
      </form>
      <div className="listWrapper">
        <ul>
          {list.map((element, index) => (
            <ListItem
              key={index}
              task={element.task}
              list={list}
              setList={setList}
              id={element._id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
