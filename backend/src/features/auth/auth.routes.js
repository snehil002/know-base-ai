const express = require("express");

const authValidator = require("../../validators/auth");
const authController = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", authValidator.validateAuthForm, authController.sendMagicLink);
authRouter.post("/login", authValidator.validateAuthForm, authController.sendMagicLink);
authRouter.get("/verify", authValidator.validateSearchParam, authController.verifyMagicLinkAndLogin);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
