const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const User = require("../features/auth/auth.model");

const isUserAuthenticated = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies["auth-token"]) {
      const err = new Error("You are not authenticated. Please login.");
      err.statusCode = 401;
      throw err;
    }

    const authToken = req.cookies["auth-token"]; // JWT token extracted from req cookie

    const { companyEmail: decodedEmail } = jwt.verify(authToken, JWT_SECRET);

    // DB Read query
    // returns the user document (without password: see model file) if found, otherwise null
    const existing = await User.findOne({ companyEmail: decodedEmail });
    if (!existing) {
      const err = new Error("Something went wrong. Please login again.");
      err.statusCode = 401;
      throw err;
    }

    req.user = {
      fullName: existing.fullName,
      companyName: existing.companyName,
      companyEmail: existing.companyEmail,
      role: existing.role,
    };

    next();
  } catch(err) {
    next(err);
  }
};

module.exports = isUserAuthenticated;