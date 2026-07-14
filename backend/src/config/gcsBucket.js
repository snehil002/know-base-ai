const path = require("path");
const { Storage } = require('@google-cloud/storage');
const { GCS_BUCKET_NAME } = require("./env");

const storage = new Storage({ 
  keyFilename: path.join(__dirname, '../../secrets/service-account.json') 
});

const bucket = storage.bucket(GCS_BUCKET_NAME);

module.exports = bucket;
