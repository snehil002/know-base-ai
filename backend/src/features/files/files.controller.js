const filesService = require("./files.service");
const response = require("../../utils/response");

exports.getUploadSignedUrl = async (req, res, next) => {
  try {
    let uploaderId, workspaceId;
    const { fileName, fileSizeInBytes, title, description } = req.body;

    const { fileId, gcsFileName } = await filesService.createFile({ fileName, fileSizeInBytes, title, description, uploaderId, workspaceId });

    const uploadSignedUrl = await filesService.getUploadSignedUrl(gcsFileName);

    response.sendSuccessResponse(res, "Successfully generated upload signed URL", { fileId, uploadSignedUrl });

  } catch (err) {
    next(err);
  }
};