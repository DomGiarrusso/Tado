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
    lPbZSMMYl9DVVoXM9JIy: { newTaskTest: "Dom" },
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
        const tados = data["tados"];
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
      }),
    }).then((res) => res.json());
    await getTados();
    setInput("");
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Tado</h1>
      </div>
      <div className="form">
        <input type="text" value={input} onChange={inputChange}></input>
        <button onClick={() => addTask()}>
          <span>add</span>
        </button>
      </div>
      <div className="tadoList">
        {Object.entries(tasks).map(([key, value]) => {
          console.log(key + " " + value.task + " " + value.completed);
          return (
            <TadoItem
              key={key}
              value={value.task}
              id={key}
              completed={value.completed}
              setTasks={setTasks}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
