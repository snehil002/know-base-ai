const authService = require("./auth.service");
const { 
  sendSuccessResponse, 
  setAuthCookieResponseHeader,
  setLogoutCookieResponseHeader,
} = require("../../utils/response");

exports.signup = async (req, res, next) => {
  try {
    await authService.signup(req.body);
    sendSuccessResponse(res, "Signup successful");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    setAuthCookieResponseHeader(res, "auth-token", data.token);
    sendSuccessResponse(res, "Login successful", data.user);
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
