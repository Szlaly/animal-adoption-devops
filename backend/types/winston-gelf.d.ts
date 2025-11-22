declare module 'winston-gelf' {
  import { TransportStreamOptions } from 'winston-transport';
  import TransportStream = require('winston-transport');

  interface GelfTransportOptions extends TransportStreamOptions {
    gelfPro: {
      adapterName: string;
      host: string;
      port: number;
      fields?: Record<string, string>;
    };
  }

  export default class GelfTransport extends TransportStream {
    constructor(options: GelfTransportOptions);
  }
}
