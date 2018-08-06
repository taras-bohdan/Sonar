import { existsSync, mkdirSync } from 'fs';
import { createLogger, transports } from 'winston';
import config from '../config/default';

require('winston-daily-rotate-file');


const dir = config.logs.dir;
if (!existsSync(dir)) {
  mkdirSync(dir);
}

const loggerTransports = [
  new (transports.Console)({
    colorize: true,
  }),
  new transports.DailyRotateFile({
    filename: config.logs.fileName,
    dirname: dir,
    maxsize: 20971520, // 20MB
    maxFiles: 25,
    datePattern: '.dd-MM-yyyy',
  }),
];

const logger = createLogger({
  level: 'debug',
  transports: loggerTransports,
});

export default logger;
