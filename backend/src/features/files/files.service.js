const bucket = require("../../config/gcsBucket");

exports.getUploadSignedUrl = async (fileName) => {
  try {
    const writeOptions = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: 'application/pdf',
    };
    
    const [url] = await bucket.file(fileName).getSignedUrl(writeOptions);
    return url;

  } catch (err) {
    err.forFrontend = {
      message: "Something went wrong generating upload URL",
      statusCode: 500,
    };
    throw err;
  }
};