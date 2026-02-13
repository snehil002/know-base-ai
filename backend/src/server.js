require('dotenv').config();
const { PORT } = require('./config/env');
const app = require('./app');
const { connectDB, setupGracefulShutdown } = require('./config/db');

(async () => {
  try {
    await connectDB();
    setupGracefulShutdown();
  } catch (err) {
    console.error('Unable to start server due to DB connection error', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})();