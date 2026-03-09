const { createUserService } = require("./users.service");
const { sendSuccessResponse } = require("../../utils/response");

exports.createUserController = async (req, res, next) => {
  try {    
    await createUserService({ ...req.body, companyName: req.user.companyName });
    return sendSuccessResponse(res, `User added successfully to company - ${req.user.companyName}`);
  } catch (err) {
    next(err);
  }
};
