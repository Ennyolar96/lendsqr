interface FetcherMethods {
    get: (uri: string, params?: {}) => Promise<any>;
    post: (uri: string, data?: {}) => Promise<any>;
    put: (uri: string, data?: {}) => Promise<any>;
    delete: (uri: string) => Promise<any>;
}
export declare const Fetcher: (method: keyof FetcherMethods, token?: string) => (uri: string, payload?: {}) => Promise<any>;
export {};
