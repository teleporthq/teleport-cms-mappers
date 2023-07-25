export declare const normalizeContent: (input: any) => any;
export declare const normalize: (content: any) => {
    meta: {
        pagination?: {
            total?: number;
            limit?: number;
            start?: number;
            pages?: number;
            page?: number;
            hasNextPage?: boolean;
            hasPrevPage?: boolean;
        };
    };
    data: Array<unknown> | unknown;
};
//# sourceMappingURL=index.d.ts.map