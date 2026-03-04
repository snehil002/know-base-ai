const express = require("express");

const validateSignupForm = require("../../middlewares/signupValidator");
const validateLoginForm = require("../../middlewares/loginValidator");
const { registerController, loginController } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", validateSignupForm, registerController);
authRouter.post("/login", validateLoginForm, loginController);

module.exports = authRouter;
