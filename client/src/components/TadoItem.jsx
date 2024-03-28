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
  const [editValue, setEditValue] = useState(value);

  // Deletes task
  const deleteTado = async (id) => {
    /* console.log("hello" + id); Used for Debugging*/
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
    /* console.log("checktest" + id); Used for Debugging */
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

  // Updates the editValue
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-floppy-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
              <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
            </svg>
          </div>
        </>
      ) : (
        <>
          <div className="text">{value}</div>
          <div className="edit-tado" onClick={() => setEditMode(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-wrench"
              viewBox="0 0 16 16"
            >
              <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11z" />
            </svg>
          </div>
        </>
      )}
      {/* <div className="edit-tado">edit</div> */}
      <div className="delete-tado" onClick={() => deleteTado(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
        </svg>
      </div>
    </div>
  );
}

export default TadoItem;
