const filesService = require("./files.service");
const response = require("../../utils/response");

exports.getUploadSignedUrl = async (req, res, next) => {
  try {
    let uploaderId, workspaceId;
    const { fileName, fileSizeInBytes, title, description } = req.body;

    const { fileId, gcsFileName } = await filesService.saveFileMetadata({ fileName, fileSizeInBytes, title, description, uploaderId, workspaceId });

    const uploadSignedUrl = await filesService.getUploadSignedUrl(gcsFileName);

    response.sendSuccessResponse(res, "Successfully generated upload signed URL", { fileId, uploadSignedUrl });

  } catch (err) {
    next(err);
  }
};

exports.updateFileUploadStatus = async (req, res, next) => {
  try {
    let workspaceId;
    const { fileId } = req.body;

    await filesService.updateFileUploadStatus(workspaceId, fileId);

    await filesService.pushFileIndexingTaskToQueue({ fileId, });
    
    response.sendSuccessResponse(res, "Your file has been successfully uploaded and queued to be indexed");

  } catch (err) {
    next(err);
  }
};
