//Imports
const express = require("express");
const cors = require("cors");
const { db } = require("./firebase.js");
require("dotenv").config();

// Instialization
const app = express();

// Port Check
// eslint-disable-next-line no-undef
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));

async function getUsers() {
  const snapshot = await db.collection("TadoList").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}

getUsers();
