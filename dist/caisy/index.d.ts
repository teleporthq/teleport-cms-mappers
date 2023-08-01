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
export declare const getEntityByAttribute: (params: any) => Promise<{
    meta: {
        pagination: {};
    };
    data: any[];
}>;
export declare const getEntitiesWithPagination: (params: any) => Promise<any>;
export declare const normalizeCaisyContent: (params: any) => {
    meta: {
        pagination?: {
            total: number;
            page: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
    data: unknown;
};
//# sourceMappingURL=index.d.ts.map