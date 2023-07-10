export declare const normalizeContent: (input: any) => any;
export declare const normalize: (content: any) => Promise<{
    meta: {
        pagination?: {
            total?: number;
            pages?: number;
        };
    };
    data: Array<unknown> | unknown;
}>;
//# sourceMappingURL=index.d.ts.map