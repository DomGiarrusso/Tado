//Imports
const express = require("express");
const cors = require ("cors");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

// Configs
const firebaseConfig = {
    apiKey: "AIzaSyBKF__BMz6-DPNoqA05NpV3wA2CpWSZkcU",
    authDomain: "tado-f17c0.firebaseapp.com",
    projectId: "tado-f17c0",
    storageBucket: "tado-f17c0.appspot.com",
    messagingSenderId: "439549230781",
    appId: "1:439549230781:web:62e29a60b02e4e5c7b81d4",
    measurementId: "G-90DHZQLP1G"
};

// Instialization
const app = express();
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

// Port Check
const port = 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));



