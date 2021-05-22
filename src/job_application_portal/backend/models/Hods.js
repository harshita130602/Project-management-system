const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hodSchema = new Schema({
  Department: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("hods", hodSchema);
