// logger.js

const colors = require('colors');

const requestLoggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  // Intercept response end method to log the status code
  const originalEnd = res.end;
  res.end = function() {
    const statusCode = res.statusCode;
    let color;
    if (statusCode >= 200 && statusCode < 300) {
      color = 'green';
    } else if (statusCode >= 400 && statusCode < 500) {
      color = 'yellow';
    } else if (statusCode >= 500) {
      color = 'red';
    } else {
      color = 'white';
    }
    console.log(`${timestamp} - ${method} ${url} - Status: ${statusCode}`[color]);
    originalEnd.apply(res, arguments);
  };

  next();
};

module.exports = requestLoggerMiddleware;