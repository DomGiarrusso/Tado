import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TadoItem.css";

const apiBase = "http://localhost:4001/tado";
// Setting propTypes
TadoItem.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  completed: PropTypes.bool.isRequired,
  setTasks: PropTypes.func.isRequired,
};

function TadoItem(props) {
  const { value, id, completed, setTasks } = props;
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");

  // Deletes task
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
      setTasks((tasks) => tasks.filter((task) => task.id !== data.id));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Updates if checked or not
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
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: completed };
          }
          return task;
        })
      );

      const patchData = await apiPatch.json();
      console.log(patchData);
    } catch (error) {
      console.error("Error updating checkbox value:", error);
    }
  };

  const taskChange = (e) => {
    setEditValue(e.target.value);
  };

  // Updates Value/Task
  const updateValue = async (id, updatedTask) => {
    try {
      const apiPatch = await fetch(apiBase + "/update/" + id, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          task: updatedTask,
          updatedAt: Date(),
        }),
      });
      if (!apiPatch.ok) {
        throw new Error("Failed to update completed");
      }
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, task: updatedTask };
          }
          return task;
        })
      );

      setEditMode(false);
      const patchData = await apiPatch.json();
      console.log(patchData);
    } catch (error) {
      console.error("Error updating task value:", error);
    }
  };
  /* let date = Date();
  console.log(date); */

  return (
    <div className={"tado" + (completed ? " check-complete" : "")} key={id}>
      <label className="check-container">
        <input
          type="checkbox"
          defaultChecked={completed}
          onClick={() => checkboxTado(id, !completed)}
        />
        <span className="checkmark"></span>
      </label>

      {/* <div className="checkbox"></div> */}
      {editMode ? (
        <>
          <input
            type="text"
            className="text-edit"
            defaultValue={value}
            onChange={taskChange}
          />
          <div className="edit-tado" onClick={() => updateValue(id, editValue)}>
            change
          </div>
        </>
      ) : (
        <>
          <div className="text">{value}</div>
          <div className="edit-tado" onClick={() => setEditMode(true)}>
            edit
          </div>
        </>
      )}
      {/* <div className="edit-tado">edit</div> */}
      <div className="delete-tado" onClick={() => deleteTado(id)}>
        <span>X</span>
      </div>
    </div>
  );
}

export default TadoItem;
