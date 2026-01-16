const { PORT } = require('./config/env');
const app = require('./app');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});