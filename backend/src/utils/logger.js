exports.logInfo = (message, meta = {}) => {
  console.dir(
    {
      level: "INFO",
      timestamp: new Date().toISOString(),
      message,
      meta,
    },
    {
      depth: null,
      colors: true,
    }
  );
};

exports.logError = (message, meta = {}) => {
  console.dir(
    {
      level: "ERROR",
      timestamp: new Date().toISOString(),
      message,
      meta,
    },
    {
      depth: null,
      colors: true,
    }
  );
};

exports.logFatal = (message, meta = {}) => {
  console.dir(
    {
      level: "FATAL",
      timestamp: new Date().toISOString(),
      message,
      meta,
    },
    {
      depth: null,
      colors: true,
    }
  );
};

exports.logWarn = (message, meta = {}) => {
  console.dir(
    {
      level: "WARN",
      timestamp: new Date().toISOString(),
      message,
      meta,
    },
    {
      depth: null,
      colors: true,
    }
  );
};
