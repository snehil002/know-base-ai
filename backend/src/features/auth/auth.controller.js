const { registerUserService, loginUserService } = require("./auth.service");
const { 
  sendSuccessResponse, setAuthCookieResponseHeader,
  setLogoutCookieResponseHeader,
} = require("../../utils/response");

exports.registerController = async (req, res, next) => {
  try {
    const data = await registerUserService(req.body);
    setAuthCookieResponseHeader(res, "auth-token", data.token);
    return sendSuccessResponse(res, "User registered successfully", data.user);
  } catch (err) {
    next(err);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const data = await loginUserService(req.body);
    setAuthCookieResponseHeader(res, "auth-token", data.token);
    return sendSuccessResponse(res, "Login successful", data.user);
  } catch (err) {
    next(err);
  }
};

exports.logoutController = async (req, res, next) => {
  try {
    setLogoutCookieResponseHeader(res, "auth-token", "");
    return sendSuccessResponse(res, "You have been logged out");
  } catch (err) {
    next(err);
  }
};
