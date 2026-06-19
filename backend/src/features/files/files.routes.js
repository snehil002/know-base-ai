const express = require("express");

const filesController = require("./files.controller");

const filesRouter = express.Router();

filesRouter.post("/get-upload-signed-url", filesController.getUploadSignedUrl);

filesRouter.post("/update-file-upload-status", filesController.updateFileUploadStatus);

module.exports = filesRouter;
