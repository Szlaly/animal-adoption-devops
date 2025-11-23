import winston from 'winston';

const Syslog = require('winston-syslog').Syslog || require('winston-syslog');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new Syslog({
      host: 'graylog',
      port: 5140,
      protocol: 'udp4',
      app_name: 'backend'
    })
  ]
});

export default logger;
