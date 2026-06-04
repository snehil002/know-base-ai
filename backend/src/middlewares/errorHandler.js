const { sendErrorResponse, setLogoutCookieResponseHeader } = require("../utils/response");
const { logError } = require("../utils/logger");

// Centralized error handling middleware
// Should definitely send an error response
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.forFrontend) {
    const { message, details, statusCode } = err.forFrontend;
    if (details && details.deAuthenticateUser === true) {
      setLogoutCookieResponseHeader(res, "auth-token", "");
    }
    sendErrorResponse(res, message, details, statusCode);
  } else {
    sendErrorResponse(res, "An unexpected error occurred.", {}, 500);
  }

  logError(err.toString(), {
    stack: err.stack,
    forBackend: err.forBackend,
    forFrontend: err.forFrontend,
    path: req.originalUrl,
  });
};