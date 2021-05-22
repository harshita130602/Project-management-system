const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  HighestDegree: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("employees", employeeSchema);
