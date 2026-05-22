const { sendErrorResponse, setLogoutCookieResponseHeader } = require("../utils/response");
const { logError } = require("../utils/logger");

// Centralized error handling middleware
// Should definitely send an error response
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  logError(err.message, {
    stack: err.stack,
    details: err.details,
    statusCode: err.statusCode,
    path: req.originalUrl,
  });

  if (typeof err.statusCode === "number") { // for frontend
    if (err.details && err.details.deAuthenticateUser === true) {
      setLogoutCookieResponseHeader(res, "auth-token", "");
    }
    return sendErrorResponse(res, err.message, err.details, err.statusCode);
  } else {
    return sendErrorResponse(res, "An unexpected error occurred.", {}, 500);
  }
};