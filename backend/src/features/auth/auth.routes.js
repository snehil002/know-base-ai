const express = require("express");

const signupFormValidator = require("../../formValidators/signup");
const loginFormValidator = require("../../formValidators/login");
const { registerController, loginController } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", signupFormValidator, registerController);
authRouter.post("/login", loginFormValidator, loginController);

module.exports = authRouter;
