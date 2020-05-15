export declare const DEFAULT: {
    servers: {
        web: (config: any) => {
            enabled: boolean;
            secure: boolean;
            serverOptions: {};
            allowedRequestHosts: string[];
            port: string | number;
            bindIP: string;
            httpHeaders: {
                "X-Powered-By": any;
                "Access-Control-Allow-Origin": string;
                "Access-Control-Allow-Methods": string;
                "Access-Control-Allow-Headers": string;
                "Strict-Transport-Security": string;
            };
            urlPathForActions: string;
            urlPathForFiles: string;
            rootEndpointType: string;
            simpleRouting: boolean;
            queryRouting: boolean;
            flatFileCacheDuration: number;
            enableEtag: boolean;
            saveRawBody: boolean;
            bootAttempts: number;
            fingerprintOptions: {
                cookieKey: string;
                toSetCookie: boolean;
                onlyStaticElements: boolean;
                settings: {
                    path: string;
                    expires: number;
                };
            };
            formOptions: {
                uploadDir: any;
                keepExtensions: boolean;
                maxFieldsSize: number;
                maxFileSize: number;
            };
            padding: number;
            metadataOptions: {
                serverInformation: boolean;
                requesterInformation: boolean;
            };
            returnErrorCodes: boolean;
            compress: boolean;
            queryParseOptions: {};
        };
    };
};
export declare const production: {
    servers: {
        web: (config: any) => {
            padding: any;
            metadataOptions: {
                serverInformation: boolean;
                requesterInformation: boolean;
            };
        };
    };
};
export declare const test: {
    servers: {
        web: (config: any) => {
            secure: boolean;
            port: string | number;
            matchExtensionMime: boolean;
            metadataOptions: {
                serverInformation: boolean;
                requesterInformation: boolean;
            };
        };
    };
};
