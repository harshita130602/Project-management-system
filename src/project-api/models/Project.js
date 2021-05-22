const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: false,
  },
  skills: {
    type: [String],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
