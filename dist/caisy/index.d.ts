export declare const getEntities: (params: any) => Promise<{
    meta: {
        pagination?: {
            total: number;
            page: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
    data: unknown;
}>;
export declare const getEntyByAttribute: (params: any) => Promise<any[] | {
    meta: {
        pagination: {};
    };
    data: any[];
}>;
export declare const getEntitiesWithPagination: (params: any) => Promise<any>;
//# sourceMappingURL=index.d.ts.map