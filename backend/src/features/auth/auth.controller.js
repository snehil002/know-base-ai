const { registerUserService, loginUserService } = require("./auth.service");
const { sendSuccessResponse, setAuthCookieResponseHeader } = require("../../utils/response");

exports.registerController = async (req, res, next) => {
  try {
    const data = await registerUserService(req.body);
    return sendSuccessResponse(res, "User registered successfully", data);
  } catch (err) {
    next(err);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const data = await loginUserService(req.body);
    setAuthCookieResponseHeader(res, "auth-token", data.token);
    return sendSuccessResponse(res, "Login successful", data);
  } catch (err) {
    next(err);
  }
};
