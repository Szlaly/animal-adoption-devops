import winston from 'winston';
import * as WinstonGelf from 'winston-gelf';
const GelfTransport = WinstonGelf.GelfTransport;

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new GelfTransport({
      gelfPro: {
        adapterName: 'udp',
        host: 'graylog', 
        port: 12201,
        fields: { facility: 'backend' }
      }
    })
  ]
});

export default logger;
