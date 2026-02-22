const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./features/auth/auth.routes");

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* Request Logging Middleware */
app.use((req, res, next) => {
  const start = new Date();
  console.log(`Incoming request - ${start.toISOString()} ${req.method} ${req.url}`);
  
  res.on('finish', () => {
    const duration = new Date() - start;
    console.log(`Finished request - ${start.toISOString()} ${req.method} ${req.url} => ${res.statusCode} ${duration}ms`);
  });

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use("/api/auth", authRouter);

app.use(errorHandler);

module.exports = app;