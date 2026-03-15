const { PDFParse } = require("pdf-parse");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const OpenAI = require("openai");
const uuidv7 = async () => {
  const { v7 } = await import("uuid");
  return v7();
};

const User = require("../auth/auth.model");
const { OPENAI_API_KEY } = require("../../config/env");
const getPineconeIndex = require("../../config/pinecone");
const { logInfo } = require("../../utils/logger");

const createBatchArrFromVectors = (vectorArr, batchSize = 200) => {
  const batchArr = [];

  for (let i = 0; i < vectorArr.length; i += batchSize) {
    batchArr.push(vectorArr.slice(i, i + batchSize));
  }

  return batchArr;
};

exports.extractTextFromFile = async (file) => {
  const pdfParser = new PDFParse({ url: file.path });
  const parsed = await pdfParser.getText();
  await pdfParser.destroy();
  const parsedPages = parsed.pages;

  return {
    parsedPagesArr: parsedPages.map((page) => page.text), 
    metadataArr: parsedPages.map((page) => ({ 
      fileName: file.originalname,
      pageNum: page.num,
      fileSizeInBytes: file.size,
    }))
  };
};

exports.createChunksFromExtractedText = async (parsedPagesArr, metadataArr) => {
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  const chunks = await splitter.createDocuments(parsedPagesArr, metadataArr);
  return chunks;
  /* 
    chunks = [ 
      Document {
        pageContent: string, 
        metadata: { pageNum: 2, loc: { lines: { from: 1, to: 5 } } }, 
        id: undefined
      }
    ]
  */
};

exports.createVectorsFromChunks = async (chunks) => {

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const vectorArr = [];
  let tokensUsed = 0;

  for (const chunk of chunks) {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk.pageContent,
      encoding_format: "float",
      dimensions: 1536
    });
    
    vectorArr.push({
      id: await uuidv7(),
      values: embedding.data[0].embedding,
      metadata: {
        pageContent: chunk.pageContent,
        ...chunk.metadata,
        loc: JSON.stringify(chunk.metadata.loc),
      }
    });

    tokensUsed += embedding.usage.total_tokens;
  }

  return {
    vectorArr, 
    tokensUsed
  };
};

exports.sendVectorsToVectorDB = async (vectorArr, namespace) => {
  logInfo("Sending vectors to Pinecone...");

  const pineconeIndex = getPineconeIndex();

  const batchArr = createBatchArrFromVectors(vectorArr);

  for (const batch of batchArr) {
    await pineconeIndex.upsert({ 
      records: batch, 
      namespace 
    });
  }

  logInfo("Vectors sent successfully to Pinecone");
};

exports.saveFilesToLoggedInUser = async (file, tokensUsed, companyEmail) => {
  logInfo("Saving files to logged in user...");
  
  const currentTime = Date.now();

  await User.updateOne(
    {
      companyEmail 
    }, 
    {
      $push: {
        uploadedFiles: {
          fileName: file.originalname,
          fileSize: file.size,
          tokensUsed,
          timestamp: currentTime,
        },
        "tokensUsed.embeddings.data": {
          tokens: tokensUsed,
          timestamp: currentTime,
        }
      },
      $inc: {
        "tokensUsed.embeddings.total": tokensUsed,
        "tokensUsed.total": tokensUsed
      },
    }
  );
  
  logInfo("File saved successfully to logged in user");
};
