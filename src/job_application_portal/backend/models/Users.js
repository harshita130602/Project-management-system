const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Create Schema
const UserSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Role: {
    type: String,
    enum: ["Employee", "Manager", "Hod"],
    required: true,
  },
  _employee: {
    type: Schema.Types.ObjectId,
    ref: "employees",
  },
  _manager: {
    type: Schema.Types.ObjectId,
    ref: "managers",
  },
  _hod: {
    type: Schema.Types.ObjectId,
    ref: "hods",
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};
module.exports = mongoose.model("Users", UserSchema);
