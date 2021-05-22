function sendMessage(res, code, message) {
  res.status(code).json({ message: message });
}

module.exports = { sendMessage };
