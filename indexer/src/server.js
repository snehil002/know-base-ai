const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../secrets/.env'), quiet: true });

const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const { REDIS_URL } = require("./config/env");

const connection = new IORedis(REDIS_URL, { maxRetriesPerRequest: null });

const worker = new Worker(
  "fileIndexingQueue",
  async job => {
    console.log(job.id);
    console.log(job.name);
    console.log(job.data);
    // throw new Error("Yey my new error!");
  },
  { connection },
);

worker.on('completed', job => {
  console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} has failed with ${err.message}`, err);
});
