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
export declare const normalizeNestedAttributes: (attributes: Record<string, any>, strapiUrl?: string) => Record<string, unknown>;
export declare const normalizeContent: (input: any, strapiUrl?: string) => any;
export declare const normalize: (content: any, strapiUrl?: string) => NormalizedContent;
export {};
//# sourceMappingURL=index.d.ts.map