const express = require("express");

const authValidator = require("../../validators/auth");
const authController = require("./auth.controller");

const authRouter = express.Router();

// authRouter.post("/signup", authValidator.validateSignupForm, authController.signup);
// authRouter.post("/login", authValidator.validateLoginForm, authController.login);

authRouter.post("/signup", authValidator.validateAuthForm, authController.sendMagicLink);
authRouter.post("/login", authValidator.validateAuthForm, authController.sendMagicLink);
authRouter.post("/verify", authValidator.validateSearchParam, authController.verifyEmailAndLogin);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;
