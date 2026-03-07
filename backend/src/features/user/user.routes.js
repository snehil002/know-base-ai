const express = require("express");

const authMiddleware = require("../../middlewares/authMiddleware");
const checkAdmin = require("../../middlewares/checkAdmin");
const createUserValidator = require("../../middlewares/createUserValidator");
const { createUserController } = require("./user.controller");

const userRouter = express.Router();

userRouter.use(authMiddleware, checkAdmin); // Apply authentication middleware to all routes in this router

userRouter.post("/create", createUserValidator, createUserController);

module.exports = userRouter;
