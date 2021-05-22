const express = require("express");
const utils = require("../utils");

// const projectValidator = require("../data-validators/project-validators");

const router = express.Router();
const Hours = require("../models/Hours");

router.post("/", (req, res) => {
  console.log("\n\nPost request:");
  console.log(req.body);
  validateAndRespond(req.body, res);
});

router.get("/", (req, res) => {
  console.log("\n\nGet Request");
  sendHours(req.body, res);
});

function validateAndRespond(data, res) {
  // Authenticate Request
  if (Object.keys(data).length === 0) {
    utils.sendMessage(res, 422, "No data");
    return;
  }
  for (var skill of Object.keys(data)) {
    console.log(skill, data[skill]);
    const newHours = new Hours({ skill: skill, hours: data[skill] });
    newHours.save((err, saved) => {
      if (err) {
        utils.sendMessage(res, 500, "Error during saving");
      }
    });
  }
  utils.sendMessage(res, 200, "OK");
}

function sendHours(data, res) {
  // Authenticate Request
  Hours.find({}, { _id: 0, __v: 0 }, (err, docs) => {
    if (err) {
      utils.sendMessage(res, 500, "Couldn't get Hours");
    } else {
      res.status(200).json({ message: "OK", hours: docs });
    }
  });
}

module.exports = router;
