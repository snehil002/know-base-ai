const { sendErrorResponse } = require("../utils/response");
const { logError } = require("../utils/logger");

// Centralized error handling middleware
// Should definitely send an error response
module.exports = (err, req, res, next) => {
  const errMsg = err.message || "Internal Server Error";
  const errDetails = err.details || {};
  const statusCode = err.statusCode || 500;

  logError(errMsg, {
    stack: err.stack,
    path: req.originalUrl,
    details: errDetails,
  });

  if (err.forFrontend) {
    return sendErrorResponse(res, errMsg, errDetails, statusCode);
  } else {
    return sendErrorResponse(res, "An unexpected error occurred", {}, 500);
  }
};