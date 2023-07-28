export declare const normalize: (input: any, page?: string) => {
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
export declare const normalizeContent: (input: any[]) => any;
//# sourceMappingURL=utils.d.ts.map