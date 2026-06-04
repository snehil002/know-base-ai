const authService = require("./auth.service");
const { 
  sendSuccessResponse, 
  setAuthCookieResponseHeader,
  setLogoutCookieResponseHeader,
} = require("../../utils/response");

exports.sendMagicLink = async (req, res, next) => {
  try {
    await authService.sendMagicLink(req.body);
    sendSuccessResponse(res, "Please look for an email from us for further instructions.");
  } catch (err) {
    next(err);
  }
};

exports.verifyMagicLinkAndLogin = async (req, res, next) => {
  try {
    const { user, jwtToken } = await authService.verifyMagicLink(req.query);
    setAuthCookieResponseHeader(res, "auth-token", jwtToken);
    sendSuccessResponse(res, "Login successful", user);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    setLogoutCookieResponseHeader(res, "auth-token", "");
    sendSuccessResponse(res, "Logout successful");
  } catch (err) {
    next(err);
  }
};
