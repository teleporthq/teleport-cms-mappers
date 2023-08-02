export declare const getEntitiesData: (params: {
    projectId: string;
    query: string;
}) => Promise<{
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
//# sourceMappingURL=entities.d.ts.map