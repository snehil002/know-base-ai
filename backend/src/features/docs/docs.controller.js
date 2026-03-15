const { 
  extractTextFromFile,
  createChunksFromExtractedText,
  createVectorsFromChunks,
  sendVectorsToVectorDB,
  saveFilesToLoggedInUser,
} = require("./docs.service");
const { sendSuccessResponse } = require("../../utils/response");

exports.fileUploadController = async (req, res, next) => {
  try {
    const file = req.file;
    const namespace = req.user.companyName;
    const companyEmail = req.user.companyEmail;

    const {parsedPagesArr, metadataArr} = await extractTextFromFile(file);
    const chunksArr = await createChunksFromExtractedText(parsedPagesArr, metadataArr);
    const {vectorArr, tokensUsed} = await createVectorsFromChunks(chunksArr);
    
    await sendVectorsToVectorDB(vectorArr, namespace);
    await saveFilesToLoggedInUser(file, tokensUsed, companyEmail);

    return sendSuccessResponse(res, "File uploaded successfully");
  } catch (err) {
    next(err);
  }
};
