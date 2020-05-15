export declare const DEFAULT: {
    tasks: (config: any) => {
        scheduler: boolean;
        queues: string[];
        workerLogging: {
            failure: string;
            success: string;
            start: string;
            end: string;
            cleaning_worker: string;
            poll: string;
            job: string;
            pause: string;
            internalError: string;
            multiWorkerAction: string;
        };
        schedulerLogging: {
            start: string;
            end: string;
            poll: string;
            enqueue: string;
            reEnqueue: string;
            working_timestamp: string;
            transferred_job: string;
        };
        timeout: number;
        minTaskProcessors: number;
        maxTaskProcessors: number;
        checkTimeout: number;
        maxEventLoopDelay: number;
        stuckWorkerTimeout: number;
        resque_overrides: {
            queue: any;
            multiWorker: any;
            scheduler: any;
        };
        connectionOptions: {
            tasks: {};
        };
    };
};
export declare const test: {
    tasks: (config: any) => {
        timeout: number;
        checkTimeout: number;
    };
};
