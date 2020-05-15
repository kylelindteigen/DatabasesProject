export declare const DEFAULT: {
    servers: {
        websocket: (config: any) => {
            enabled: boolean;
            clientUrl: string;
            clientJsPath: string;
            clientJsName: string;
            destroyClientsOnShutdown: boolean;
            server: {};
            client: {
                apiPath: string;
                cookieKey: any;
            };
        };
    };
};
