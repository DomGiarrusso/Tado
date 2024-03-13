const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccount.json");
const app = initializeApp({
  credential: cert(serviceAccount),
});

try {
  const db = getFirestore(app);
  console.log("Firestore connected");
  module.exports = { db };
} catch (error) {
  console.error("Error getting Firestore:", error);
}
