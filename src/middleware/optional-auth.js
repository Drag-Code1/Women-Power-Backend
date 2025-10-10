const jwt = require("jsonwebtoken");

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
}

module.exports = optionalAuth;
