declare module 'winston-syslog' {
  import TransportStream = require('winston-transport');

  interface SyslogTransportOptions {
    host?: string;
    port?: number;
    protocol?: 'udp4' | 'tcp4';
    app_name?: string;
  }

  export default class Syslog extends TransportStream {
    constructor(options?: SyslogTransportOptions);
  }
}
