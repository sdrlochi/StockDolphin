const jwt = require("jsonwebtoken");

//going to take our id from database and return it to a encrypted token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;