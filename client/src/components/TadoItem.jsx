import React, { useState } from "react";
import "./TadoItem.css";
//add api here later
const apiBase = "http://localhost:4001/tado";

function TadoItem(props) {
  const { value, id, setTasks } = props;

  const deleteTado = async (id) => {
    console.log("hello" + id);
    try {
      const apiDelete = await fetch(apiBase + "/delete/" + id, {
        method: "DELETE",
      });
      if (!apiDelete.ok) {
        throw new Error("Failed to delete a task");
      }
      const data = await apiDelete.json();
      setTasks((tasks) => tasks.filter((task) => task.task !== data.task));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="tado">
      <div className="checkbox"></div>
      <div className="text">{id + " " + value}</div>
      <div className="edit-tado">
        <span>edit</span>
      </div>
      <div className="delete-tado" onClick={() => deleteTado(id)}>
        <span>X</span>
      </div>
    </div>
  );
}

export default TadoItem;
