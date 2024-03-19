import React, { useState } from "react";
import "./TadoItem.css";
//add api here later
const apiBase = "http://localhost:4001/tado";

function TadoItem(props) {
  const { value, id, completed, setTasks } = props;

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
      console.log("delete" + data);
      setTasks((tasks) =>
        Object.fromEntries(
          Object.entries(tasks).filter(([key, value]) => key !== data.id)
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const checkboxTado = async (id, completed) => {
    console.log("checktest" + id);
    try {
      const apiPatch = await fetch(apiBase + "/update/" + id, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          completed: completed,
        }),
      });
      if (!apiPatch.ok) {
        throw new Error("Failed to update completed");
      }
      setTasks((tasks) =>
        Object.fromEntries(
          Object.entries(tasks).map(([key, value]) => {
            if (key === id) {
              return [key, { ...value, completed: completed }];
            }
            return [key, value];
          })
        )
      );
      const patchData = await apiPatch.json();
      console.log(patchData);
    } catch (error) {
      console.error("Error updating checkbox value:", error);
    }
  };

  return (
    <div className={"tado" + (completed ? " check-complete" : "")} key={id}>
      <input
        type="checkbox"
        defaultChecked={completed}
        onClick={() => checkboxTado(id, !completed)}
      ></input>
      {/* <div className="checkbox"></div> */}
      <div className="text">{value}</div>
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
