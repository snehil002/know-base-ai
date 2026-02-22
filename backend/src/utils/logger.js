exports.logInfo = (message, meta = {}) => {
  console.log(
    {
      level: "info",
      timestamp: new Date().toISOString(),
      message,
      meta,
    }
  );
};

exports.logError = (message, meta = {}) => {
  console.error(
    {
      level: "error",
      timestamp: new Date().toISOString(),
      message,
      meta,
    }
  );
};