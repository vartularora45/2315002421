import log from '../logger/logger.js';

const requestLogger = (req, res, next) => {
  log('info', `${req.method} ${req.originalUrl}`);
  next();
};

export default requestLogger;
