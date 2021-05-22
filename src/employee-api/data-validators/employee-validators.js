function validateName(name) {
  return name !== undefined && name.length >= 2;
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

function validateEmail(email) {
  return email !== undefined && email.length >= 2;
}

module.exports = {
  validateName,
  validateSkills,
  validateEmail,
};
