const { NODE_ENV } = require("../config/env");

exports.sendSuccessResponse = (res, message = "Success", details = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    details: JSON.stringify(details),
  });
};

exports.sendErrorResponse = (res, message = "Error", details = {}, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    details: JSON.stringify(details)
  });
};

exports.setAuthCookieResponseHeader = (res, key, value) => {
  return res.cookie(key, value, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    sameSite: "Strict",
  });
};
