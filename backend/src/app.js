const express = require('express');

const app = express();

/* Request Logging Middleware */
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${new Date(start).toISOString()}: ${req.method} ${req.url} S=${res.statusCode} D=${duration}ms`);
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