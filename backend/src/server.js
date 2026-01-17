require('dotenv').config();
const { PORT } = require('./config/env');
const app = require('./app');
const connectDB = require('./config/db');

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});