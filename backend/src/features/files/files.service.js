const bucket = require("../../config/gcsBucket");
const filesModel = require("./files.model");

exports.createFile = async ({
  fileName,
  fileSizeInBytes,
  title,
  description,
  uploaderId,
  workspaceId,
}) => {
  try {
    const file = new filesModel.File({
      fileName,
      fileSizeInBytes,
      title,
      description,
      uploaderId,
      workspaceId
    });
    
    const gcsFileName = `${file._id}_${fileName}`;
    file.gcsFileName = gcsFileName;
    
    await file.save();
    
    return {
      fileId: file._id,
      gcsFileName
    };

  } catch (err) {
    err.forFrontend = {
      message: "Something went wrong generating file ids",
      statusCode: 500,
    };
    throw err;
  }
};

exports.getUploadSignedUrl = async (gcsFileName) => {
  try {
    const writeOptions = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: 'application/pdf',
    };
    
    const [url] = await bucket.file(gcsFileName).getSignedUrl(writeOptions);
    return url;

  } catch (err) {
    err.forFrontend = {
      message: "Something went wrong generating file upload URL",
      statusCode: 500,
    };
    throw err;
  }
};

exports.updateFileUploadStatus = async (workspaceId, fileId) => {
  try {
    await filesModel.File.updateOne(
      {
        _id: fileId,
        workspaceId
      },
      {
        $set: {
          uploadingStatus: "completed"
        }
      }
    );
  } catch (err) {
    err.forFrontend = {
      message: "Something went wrong updating the status of the file upload",
      statusCode: 500,
    };
    throw err;
  }
};
