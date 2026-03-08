const express = require("express");

const createUserValidator = require("../../middlewares/createUserValidator");
const { createUserController } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/create", createUserValidator, createUserController);

module.exports = userRouter;
