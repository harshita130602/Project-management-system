const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new Schema({
  WorkExperience: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("managers", managerSchema);
