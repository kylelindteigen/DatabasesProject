export declare const DEFAULT: {
    redis: (config: any) => {
        enabled: boolean;
        _toExpand: boolean;
        client: {
            konstructor: any;
            args: {
                port: string | number;
                host: string;
                password: string;
                db: number;
                retryStrategy: (times: any) => number;
            }[];
            buildNew: boolean;
        };
        subscriber: {
            konstructor: any;
            args: {
                port: string | number;
                host: string;
                password: string;
                db: number;
                retryStrategy: (times: any) => number;
            }[];
            buildNew: boolean;
        };
        tasks: {
            konstructor: any;
            args: {
                port: string | number;
                host: string;
                password: string;
                db: number;
                retryStrategy: (times: any) => number;
            }[];
            buildNew: boolean;
        };
    };
};
