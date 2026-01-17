const { Client } = require('pg');

const { PG_DB_URL } = require("./env");

const client = new Client({
  connectionString: PG_DB_URL
});

async function connectDB () {
  try {
    await client.connect();
    console.log(`Connected to the database: ${client.database}`);
  } catch (err) {
    console.error('error: Failed to connect to the database:');
    console.error(PG_DB_URL == undefined ? 'error: env PG_DB_URL not found' : err);
  }
}

module.exports = connectDB;