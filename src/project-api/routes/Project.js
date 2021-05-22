const express = require("express");
const utils = require("../utils");

const projectValidator = require("../data-validators/project-validators");

const router = express.Router();
const Project = require("../models/Project");

router.post("/", (req, res) => {
  console.log("\n\nPost request:");
  console.log(req.body);
  validateAndRespond(req.body, res);
});

router.get("/", (req, res) => {
  console.log("\n\nGet Request");
  sendProjects(req.body, res);
});

function validateAndRespond(data, res) {
  // Authenticate Request
  if (!projectValidator.validateName(data.name)) {
    utils.sendMessage(res, 422, "Invalid Name");
    return;
  }

  if (!projectValidator.validateDuration(data.duration)) {
    utils.sendMessage(res, 422, "Invalid Duration");
    return;
  }

  if (!projectValidator.validateSkills(data.skills)) {
    utils.sendMessage(res, 422, "Invalid Skills");
    return;
  }

  if (!projectValidator.validateDepartment(data.department)) {
    utils.sendMessage(res, 422, "Invalid Department");
    return;
  }

  const newProject = new Project(data);
  newProject.save((err, saved) => {
    if (err) {
      utils.sendMessage(res, 500, "Error during saving");
    } else {
      utils.sendMessage(res, 200, "OK");
    }
  });
}

function sendProjects(data, res) {
  // Authenticate Request
  Project.find({}, (err, docs) => {
    if (err) {
      utils.sendMessage(res, 500, "Couldn't get projects");
    } else {
      res.status(200).json({ message: "OK", projects: docs });
    }
  });
}

module.exports = router;
