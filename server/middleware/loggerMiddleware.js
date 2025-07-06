import logger from '../logger/log.js';

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const originalJson = res.json;

  res.json = function (data) {
    const duration = Date.now() - start;

    const { method, originalUrl, body, params } = req;

    const status = res.statusCode;
    const level =
      status >= 500 ? 'error' :
      status >= 400 ? 'warn' :
      'info';

    const logMessage = {
      method,
      url: originalUrl,
      status,
      duration: `${duration}ms`,
      body: Object.keys(body || {}).length ? body : undefined,
      params: Object.keys(params || {}).length ? params : undefined,
      response: data,
    };

    logger[level](`➡️ ${method} ${originalUrl} → ${status} [${duration}ms]`);
    logger[level](JSON.stringify(logMessage, null, 2));

    return originalJson.call(this, data);
  };

  next();
};

export default requestLogger;
