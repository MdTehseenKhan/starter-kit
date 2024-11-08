import pino, { type Logger } from 'pino';

const logger = pino({
  browser: {
    asObject: true,
  },
  level: 'debug',
  base: {
    env: process.env.NODE_ENV,
  },
});

export { logger, type Logger };
