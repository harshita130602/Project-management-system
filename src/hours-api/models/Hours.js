const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoursSchema = new Schema({
  // EmployeeID
  // ProjectID
  skill: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Hours", HoursSchema);
