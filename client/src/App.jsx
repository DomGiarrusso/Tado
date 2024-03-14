import { useEffect, useState } from "react";
import TadoItem from "./components/TadoItem";
import "./App.css";

function App() {
  // useState Array
  const [items, setItems] = useState([]);

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

  const getTados = () => {
    fetch("http://localhost:4001/tado")
      .then((res) => res.json())
      .then((data) => {
        const tados = data["tados"];
        setItems(tados);
      })
      .catch((err) => console.log(err));
  };
  console.log(items);

  return (
    <div className="container">
      <div className="heading">
        <h1>Tado</h1>
      </div>
      <div className="form">
        <input type="text"></input>
        <button>
          <span>add</span>
        </button>
      </div>
      <div className="tadoList">
        {Object.entries(items).map(([key, value]) => (
          <TadoItem key={key} value={value.newTaskTest} setItems={setItems} />
        ))}
      </div>
    </div>
  );
}

export default App;
