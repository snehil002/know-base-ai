const express = require('express');

const app = express();

/* Request Logging Middleware */
app.use((req, res, next) => {
  const start = new Date();
  
  res.on('finish', () => {
    const duration = new Date() - start;
    console.log(`${start.toISOString()} ${req.method} ${req.url} => ${res.statusCode} ${duration}ms`);
  });

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;