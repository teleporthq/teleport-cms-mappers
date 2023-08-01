export declare const normalizeList: (input: any, page?: string) => {
    meta: {
        pagination?: {
            total: number;
            page: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
    data: Array<unknown> | unknown;
};
export declare const normalizeItem: (input: Record<string, unknown>) => {
    meta: {
        pagination: {};
    };
    data: any[];
};
export declare const getAPIUrlByProjectId: (projectId: string) => string;
export declare const handleFetchResponse: (response: Response) => Promise<any>;
//# sourceMappingURL=utils.d.ts.map