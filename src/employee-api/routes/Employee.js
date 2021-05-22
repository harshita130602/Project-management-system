const express = require("express");
const utils = require("../utils");

const router = express.Router();
const Employee = require("../models/Employee");

const employeeValidator = require("../data-validators/employee-validators");
const { set } = require("mongoose");

// Create Employee in
router.post("/", (req, res) => {
  console.log("\n\nPost request:");
  console.log(req.body);
  validateAndCreate(req.body, res);
});
// Get employees based on suplied criteria
router.get("/", (req, res) => {
  console.log("\n\nGet Request");
  console.log(req.body);
  sendEmployees(req.body, res);
});

function validateAndCreate(data, res) {
  if (!employeeValidator.validateName(data.name)) {
    utils.sendMessage(res, 422, "Invalid Name");
    return;
  }

  if (!employeeValidator.validateEmail(data.email)) {
    utils.sendMessage(res, 422, "Invalid Email");
  }

  if (!employeeValidator.validateSkills(data.skills)) {
    utils.sendMessage(res, 422, "Invalid Skills");
    return;
  }

  Employee.findOne({ email: data.email }, (err, results) => {
    console.log(results);
    if (results !== null) {
      utils.sendMessage(res, 409, "Email Already in Use");
      return;
    } else {
      const newEmployee = new Employee(data);
      newEmployee.save((err, saved) => {
        if (err) {
          utils.sendMessage(res, 500, "Error during saving");
        } else {
          utils.sendMessage(res, 200, "OK");
        }
      });
    }
  });
}

function sendEmployees(data, res) {
  Employee.find({}, { _id: 0, __v: 0,}, (err, docs) => {
    if (err) {
      utils.sendMessage(res, 500, "Couldn't get Employees");
    } else {
      if (data.skills === undefined) {
        res.status(200).json({ message: "OK", employees: docs });
      } else {
        docs = docs.filter((employee) => {
          return (
            employee.skills.filter((skill) => data.skills.includes(skill))
              .length > 0
          );
        });
        res.status(200).json({ message: "OK", employees: docs });
      }
    }
  });
}

module.exports = router;
