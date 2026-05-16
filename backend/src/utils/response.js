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
    details: JSON.stringify(details),
  });
};

exports.setAuthCookieResponseHeader = (res, key, value) => {
  return res.cookie(key, value, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // prevent client-side JavaScript from accessing the cookie
    secure: true, // only send cookie over HTTPS/localhost, cross site cookies require a secure context
    sameSite: "None", // allow cross-site cookies
  });
};

exports.setLogoutCookieResponseHeader = (res, key, value) => {
  return res.cookie(key, value, {
    maxAge: -1, // Tell browser to remove cookie
    httpOnly: true, // prevent client-side JavaScript from accessing the cookie
    secure: true, // only send cookie over HTTPS/localhost, cross site cookies require a secure context
    sameSite: "None", // allow cross-site cookies
  });
};

exports.resWrite = (res, type, content) => {
  return res.write(JSON.stringify({
    type,
    content
  }) + "\n");
};

exports.resEnd = (res, type, content) => {
  if (type === undefined) {
    return res.end();
  } else {
    return res.end(JSON.stringify({
      type,
      content
    }) + "\n");
  }
};
