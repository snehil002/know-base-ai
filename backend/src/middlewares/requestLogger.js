const requestLogger = (req, res, next) => {
  const start = new Date();
  console.log(`Incoming request @ ${start.toISOString()} ${req.method} ${req.originalUrl}`);
  
  res.on('finish', () => {
    const duration = new Date() - start;
    console.log(`Finished request @ ${start.toISOString()} ${req.method} ${req.originalUrl} => ${res.statusCode} ${duration}ms`);
  });

  next();
};

module.exports = requestLogger;