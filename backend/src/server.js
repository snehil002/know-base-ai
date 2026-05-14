const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../secrets/.env'), quiet: true });
const { PORT } = require('./config/env');
const app = require('./app');
const connectDB = require('./config/db');

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server:', err);
  }
})();