type Pagination = {
    total?: number;
    limit?: number;
    start?: number;
    pages?: number;
    page?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
};
type NormalizedContent = {
    meta: {
        pagination?: Pagination;
    };
    data: unknown[] | unknown;
};
export declare const normalizeNestedAttributes: (attributes: Record<string, any>) => Record<string, unknown>;
export declare const normalizeContent: (input: any) => any;
export declare const normalize: (content: any) => NormalizedContent;
export {};
//# sourceMappingURL=index.d.ts.map