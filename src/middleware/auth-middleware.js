const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

module.exports = (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new AppError("Authorization token missing", StatusCodes.UNAUTHORIZED)
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return next(
          new AppError("Forbidden: Access denied", StatusCodes.FORBIDDEN)
        );
      }

      next();
    } catch (error) {
      return next(
        new AppError("Invalid or expired token", StatusCodes.UNAUTHORIZED)
      );
    }
  };
};
