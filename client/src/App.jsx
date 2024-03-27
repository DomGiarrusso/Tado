import { useEffect, useState } from "react";
import TadoItem from "./components/TadoItem";
import "./App.css";

const apiBase = "http://localhost:4001/tado";

function App() {
  // useState Array
  const [tasks, setTasks] = useState([]); //Note that task is not Array but is an object
  const [input, setInput] = useState("");

  // sample data if needed for testing
  /* const sampleData = {
    lPbZSMMYl9DVVoXM9JIy: { newTaskTest: "Dom", createdAt:  },
    GabcDEf456GHIJ789kl: { newTaskTest: "Value2" },
    Yxyz123ABC456DEF789: { newTaskTest: "Value3" },
  }; */

  // useEffect to run GetTados every render
  useEffect(() => {
    getTados();
  }, []);

  // change the input state
  const inputChange = (e) => {
    setInput(e.target.value);
  };

  const getTados = () => {
    fetch(apiBase)
      .then((res) => res.json())
      .then((data) => {
        const tados = Object.keys(data.tados).map((key) => ({
          id: key,
          ...data.tados[key],
        }));
        setTasks(tados);
      })
      .catch((err) => console.log(err));
  };

  const addTask = async () => {
    const data = await fetch(apiBase + "/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        task: input,
        completed: false,
        createdAt: Date(),
        updatedAt: Date(),
      }),
    }).then((res) => res.json());
    await getTados();
    setInput("");
  };
  const sortedData = tasks.sort((a, b) => {
    const createdAtComparison = new Date(b.createdAt) - new Date(a.createdAt);
    if (createdAtComparison !== 0) {
      return createdAtComparison;
    }
    const updatedAtComparison = new Date(b.updatedAt) - new Date(a.updatedAt);
    if (updatedAtComparison !== 0) {
      return updatedAtComparison;
    }

    return a.id - b.id; // If createdAt and updatedAt are equal, sort by id
  });

  console.log(sortedData);
  return (
    <div className="container">
      <div className="heading">
        <h1>TADO</h1>
      </div>
      <div className="form">
        <input type="text" value={input} onChange={inputChange}></input>
        <button onClick={() => addTask()}>
          <span>add</span>
        </button>
      </div>
      <div className="tadoList">
        {tasks.map((task) => {
          console.log(task.id + " " + task.task + " " + task.completed);
          return (
            <TadoItem
              key={task.id}
              value={task.task}
              id={task.id}
              completed={task.completed}
              setTasks={setTasks}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
