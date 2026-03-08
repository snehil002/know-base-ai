const { sendErrorResponse } = require("../utils/response");
const { logError } = require("../utils/logger");

// Centralized error handling middleware
// Should definitely send an error response
module.exports = (err, req, res, next) => {
  logError(err.message, {
    stack: err.stack,
    details: err.details,
    statusCode: err.statusCode,
    path: req.originalUrl,
  });

  if (typeof err.statusCode === "number") { // for frontend
    return sendErrorResponse(res, err.message, err.details, err.statusCode);
  } else {
    return sendErrorResponse(res, "An unexpected error occurred.", {}, 500);
  }
};