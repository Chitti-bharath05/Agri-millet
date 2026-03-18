const jwt = require('jsonwebtoken');

const generateToken = (userId, userType) => {
  return jwt.sign(
    { userId, userType },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

module.exports = { generateToken };
