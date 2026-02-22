const { sendErrorResponse } = require("../utils/response");
const { logError } = require("../utils/logger");

module.exports = (err, req, res, next) => {
  const errMsg = err.message || "Internal Server Error";
  const errDetails = err.details || {};
  const statusCode = err.statusCode || 500;

  logError(errMsg, {
    stack: err.stack,
    path: req.originalUrl,
  });

  return sendErrorResponse(res, errMsg, errDetails, statusCode);
};