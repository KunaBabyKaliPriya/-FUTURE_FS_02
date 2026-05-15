const jwt = require('jsonwebtoken');

// Sign a JWT for the given user id
module.exports = function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};
