const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { FRONTEND_URL } = require("./config/env");
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require('./middlewares/requestLogger');

const authMiddleware = require("./middlewares/authMiddleware");
const checkAdmin = require('./middlewares/checkAdmin');

const authRouter = require("./features/auth/auth.routes");
const usersRouter = require("./features/users/users.routes");
const docsRouter = require("./features/docs/docs.routes");

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, // allow cookies to be sent
}));

app.use(cookieParser());

/* Request Logging Middleware */
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use("/api/auth", authRouter);

app.use(authMiddleware);

app.use("/api/users", checkAdmin, usersRouter);

app.use("/api/docs", docsRouter);

app.use(errorHandler);

module.exports = app;