declare module 'winston-gelf' {
    import { TransportStreamOptions } from 'winston';
    import Transport from 'winston-transport';

    export class GelfTransport extends Transport {
        constructor(opts?: TransportStreamOptions & {
            gelfPro: {
                adapterName: string;
                host: string;
                port: number;
                fields?: Record<string, any>;
            };
        });
    }
}
