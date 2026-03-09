const express = require("express");

const createUserValidator = require("../../formValidators/createUser");
const { createUserController } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post("/create", createUserValidator, createUserController);

module.exports = usersRouter;
