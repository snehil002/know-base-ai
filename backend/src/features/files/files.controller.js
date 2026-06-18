const filesService = require("./files.service");
const response = require("../../utils/response");

exports.getUploadSignedUrl = async (req, res, next) => {
  try {
    const { fileName } = req.body;

    const url = await filesService.getUploadSignedUrl(fileName);

    response.sendSuccessResponse(res, "Successfully generated upload signed URL", { url });

  } catch (err) {
    next(err);
  }
};