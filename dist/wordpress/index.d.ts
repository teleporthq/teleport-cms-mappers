export declare const normalizeContent: (input: any) => any;
export declare const normalize: (content: any, requestParams: any) => Promise<{
    meta: {
        pagination?: {
            total?: number;
            pages?: number;
            hasNextPage?: boolean;
            hasPrevPage?: boolean;
        };
    };
    data: Array<unknown> | unknown;
}>;
//# sourceMappingURL=index.d.ts.map