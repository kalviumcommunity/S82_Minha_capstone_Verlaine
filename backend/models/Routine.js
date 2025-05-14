const mongoose = require("mongoose");
// Define the schema for a skincare routine
const routineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Relationship: Each routine is linked to one user (Many Routines -> One User)
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true }); 

module.exports = mongoose.model("Routine", routineSchema);