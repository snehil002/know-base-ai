const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { FRONTEND_URL } = require("./config/env");
const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./features/auth/auth.routes");
const userRouter = require("./features/user/user.routes");
const authMiddleware = require("./middlewares/authMiddleware");
const checkAdmin = require('./middlewares/checkAdmin');

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, // allow cookies to be sent
}));

app.use(cookieParser());

/* Request Logging Middleware */
app.use((req, res, next) => {
  const start = new Date();
  console.log(`Incoming request @ ${start.toISOString()} ${req.method} ${req.originalUrl}`);
  
  res.on('finish', () => {
    const duration = new Date() - start;
    console.log(`Finished request @ ${start.toISOString()} ${req.method} ${req.originalUrl} => ${res.statusCode} ${duration}ms`);
  });

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// app.get('/test', authMiddleware, (req, res) => {
//   console.log('req.cookies', req.cookies);
//   console.log('req.user', req.user);
//   res.json({ message: 'This is a test route', cookies: req.cookies||'', user: req.user||'' });
// });

app.use("/api/auth", authRouter);

app.use(authMiddleware);

app.use("/api/users", checkAdmin, userRouter);

app.use(errorHandler);

module.exports = app;