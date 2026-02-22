const { registerUserService, loginUserService } = require("./auth.service");
const { sendSuccessResponse } = require("../../utils/response");

exports.register = async (req, res, next) => {
  try {
    const data = await registerUserService(req.body);
    return sendSuccessResponse(res, "User registered successfully", data);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await loginUserService(req.body);
    return sendSuccessResponse(res, "Login successful", data);
  } catch (err) {
    next(err);
  }
};
