import { existsSync, mkdirSync } from 'fs';
import { createLogger, format, transports } from 'winston';
import {config} from '../config/default';

const { simple, combine, colorize } = format;

require('winston-daily-rotate-file');


const singleton = Symbol('logger class member name');
const singletonEnforcer = Symbol('constructor parameter');

/**
 * Logger service
 */
class LoggerService {

  /**
   * Service constructor
   * @param {symbol} enforcer - singleton enforcer
   * @return {winston.Logger} - logger instance
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.dir = config.logs.dir;
    this.transports = [
      new (transports.Console)({
        format: combine(
          colorize(),
          simple(),
        ),
      }),
      new transports.DailyRotateFile({
        filename: config.logs.fileName,
        dirname: this.dir,
        maxsize: 20971520, // 20MB
        maxFiles: 25,
        datePattern: '.dd-MM-yyyy',
      }),
    ];

    LoggerService.createDir(this.dir);

    return createLogger({
      level: 'debug',
      transports: this.transports,
    });
  }

  /**
   * Create directory if not exists
   * @param {string} dirName - name of directory
   * @returns {void}
   */
  static createDir(dirName) {
    // create dir if not exist
    if (!existsSync(dirName)) {
      mkdirSync(dirName);
    }
  }

  /**
   * get logger instance
   * @return {winston.Logger} - logger instance
   */
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new LoggerService(singletonEnforcer);
    }

    return this[singleton];
  }
}

export default LoggerService.instance;
