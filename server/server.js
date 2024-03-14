//Imports
const express = require("express");
const cors = require("cors");
const { db } = require("./firebase.js");
//const { tadoSchema } = require("./models/todo.js");
require("dotenv").config();

// Instialization
const app = express();

// Port Check
// eslint-disable-next-line no-undef
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Test db
async function getTado() {
  const snapshotTest = await db.collection("TadoList").get();
  snapshotTest.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}

// Endpoints
app.get("/tado", async (req, res) => {
  const tados = {};

  try {
    const tadoRef = db.collection("TadoList");
    const snapshot = await tadoRef.get();
    snapshot.forEach((doc) => {
      tados[doc.id] = doc.data();
    });
    res.json({ message: "Data retrived from Firestore", tados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from Firestore" });
  }
});

app.post("/tado/new", async (req, res) => {
  try {
    // Later on add Validation of the data that is coming in
    const newTaskRef = db.collection("TadoList").doc();
    await newTaskRef.set(req.body);
    const newTaskSnapshot = await newTaskRef.get();
    const newTaskData = newTaskSnapshot.exists ? newTaskSnapshot.data() : {};
    res.status(201).json({
      message: "Task created successfully",
      id: newTaskRef.id,
      data: newTaskData,
    });
    console.log("Task was created succesfully");
  } catch (error) {
    console.error("Error getting the data from frontend", error);
    res.status(500).json({ message: "Error creating task" });
  }
});

app.patch("/tado/update/:id", async (req, res) => {
  const updateId = req.params.id;
  const updateData = req.body;
  const updateTaskRef = db.collection("TadoList").doc(updateId);
  try {
    await updateTaskRef.update(updateData);
    console.log("Updated Task");
    res.json({
      message: "Task updated successfully",
      id: updateId,
      data: updateData,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/tado/delete/:id", async (req, res) => {
  const deleteId = req.params.id;
  const deleteTaskRef = db.collection("TadoList").doc(deleteId);
  try {
    await deleteTaskRef.delete();
    res.json({ message: "Deleted Task successfully" });
    console.log("Delete Task from database");
  } catch (error) {
    console.error("Error deleting Task from database:", error);
    res.status(500).json({ message: "Error deleting Task" });
  }
});

getTado();
app.listen(port, () => console.log(`Server is running on port ${port}`));
