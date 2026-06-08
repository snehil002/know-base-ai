const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const authModel = require("../features/auth/auth.model");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies["auth-token"]) { // no cookie/expired
      const err = new Error("No cookie or expired cookie.");
      err.forFrontend = {
        message: "You are not authenticated. Please login.",
        statusCode: 401,
      };
      throw err;
    }

    const authToken = req.cookies["auth-token"]; // JWT token extracted from req cookie

    let userId;
    try {
      ({ userId } = jwt.verify(authToken, JWT_SECRET));
    } catch (err) {
      err.forFrontend = {
        message: "You are not authenticated. Please login.",
        details: { deAuthenticateUser: true },
        statusCode: 401,
      };
      throw err;
    }

    // DB Read query
    // returns the user document (without password: see model file) if found, otherwise null
    const existing = await authModel.User.findById(userId);

    if (!existing) {
      const err = new Error("User does not exist.");
      err.forFrontend = {
        message: "Something went wrong. You have been logged out.",
        details: { deAuthenticateUser: true },
        statusCode: 401,
      };
      throw err;
    }

    req.user = {
      _id: existing._id,
      fullName: existing.fullName,
      companyEmail: existing.companyEmail,
    };

    next();
  } catch (err) {
    if (!err.forFrontend) {
      err.forFrontend = {
        message: "Something went wrong. You have been logged out.",
        details: { deAuthenticateUser: true },
        statusCode: 500,
      };
    }
    next(err);
  }
};

module.exports = authMiddleware;