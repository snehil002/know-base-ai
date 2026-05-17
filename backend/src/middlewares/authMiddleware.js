const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const User = require("../features/auth/auth.model");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies["auth-token"]) { // no cookie/expired
      const err = new Error("You are not authenticated. Please login.");
      err.statusCode = 401;
      throw err;
    }

    const authToken = req.cookies["auth-token"]; // JWT token extracted from req cookie

    const { userId } = jwt.verify(authToken, JWT_SECRET);

    // DB Read query
    // returns the user document (without password: see model file) if found, otherwise null
    const existing = await User.findById(userId);

    if (!existing) {
      const err = new Error("Something went wrong. You have been logged out.");
      err.statusCode = 401;
      throw err;
    }

    req.user = {
      _id: existing._id,
      fullName: existing.fullName,
      companyName: existing.companyName,
      companyEmail: existing.companyEmail,
      role: existing.role,
    };

    next();
  } catch(err) {
    err.details = { deAuthenticateUser: true };
    next(err);
  }
};

module.exports = authMiddleware;