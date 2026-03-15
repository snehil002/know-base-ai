const { Pinecone } = require("@pinecone-database/pinecone");
const { 
  PINECONE_API_KEY, 
  PINECONE_INDEX_NAME, 
  PINECONE_INDEX_HOST, 
} = require("./env");

const getPineconeIndex = () => {
  const pc = new Pinecone({
    apiKey: PINECONE_API_KEY
  });

  const pineconeIndex = pc.index({name: PINECONE_INDEX_NAME, host: PINECONE_INDEX_HOST});
  return pineconeIndex;
};

module.exports = getPineconeIndex;