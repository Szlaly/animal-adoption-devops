import winston from 'winston';
import 'winston-gelf'; 

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new (winston.transports as any).Gelf({
      gelfPro: {
        adapterName: 'udp',
        host: 'graylog', 
        port: 9000,
        fields: { facility: 'backend' }
      }
    })
  ]
});

export default logger;