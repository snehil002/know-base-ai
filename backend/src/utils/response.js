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