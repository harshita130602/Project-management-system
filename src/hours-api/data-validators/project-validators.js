function validateName(name) {
  return name !== undefined && name.length >= 2;
}

function validateDuration(duration) {
  return duration !== undefined && duration >= 1 && duration <= 36;
}

function validateSkills(skills) {
  if (skills === undefined) {
    return false;
  }
  skills.forEach((skill) => {
    if (skill.length < 1) {
      return false;
    }
  });
  return true;
}

function validateDepartment(department) {
  if (department === undefined) {
    return false;
  }
  validDepartments = ["Research", "Production", "Marketing", "Human Resources"];
  return validDepartments.includes(department);
}

module.exports = {
  validateName,
  validateDuration,
  validateSkills,
  validateDepartment,
};
