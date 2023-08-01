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
//# sourceMappingURL=utils.d.ts.map