const express = require("express");

const authValidator = require("../../validators/auth");
const authController = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", authValidator.validateSignupForm, authController.signup);
authRouter.post("/login", authValidator.validateLoginForm, authController.login);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
