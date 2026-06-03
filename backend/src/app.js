const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { FRONTEND_URL } = require("./config/env");
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require('./middlewares/requestLogger');
const authMiddleware = require("./middlewares/authMiddleware");

const authRouter = require("./features/auth/auth.routes");
// const usersRouter = require("./features/users/users.routes");
// const filesRouter = require("./features/files/files.routes");
// const chatsRouter = require('./features/chats/chats.routes');
// const tokensRouter = require('./features/tokens/tokens.routes');

const app = express();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, // allow cookies to be sent
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use("/api/auth", authRouter);

app.use(authMiddleware);

// app.use("/api/users", usersRouter);

// app.use("/api/files", filesRouter);

// app.use("/api/chats", chatsRouter);

// app.use("/api/tokens", tokensRouter);

app.use(errorHandler);

module.exports = app;