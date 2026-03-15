const express = require("express");
const path = require("path");
const multer  = require('multer');
const upload = multer({ dest: path.join(__dirname, '../../../uploads/') });

const { fileUploadController } = require("./docs.controller");
const checkAdmin = require("../../middlewares/checkAdmin");

const docsRouter = express.Router();

docsRouter.use(checkAdmin);

docsRouter.post("/upload", upload.single("fileUpload"), fileUploadController);

module.exports = docsRouter;
