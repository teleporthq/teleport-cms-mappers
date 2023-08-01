/**
 * When getting entities by page in caisy we might need to do multiple calls
 * 1. if page == 1 or next page doesn't exist, we just read them from one call
 * 2. if page > 1, we fetch all the entities before the requested page
 * 3. we save the "endCursor", which is the last item identifier from the previous call
 * 4. Then, we request the first "perPage" number of items, after the given endCursor
 * More info on the official doc:
 * https://caisy.io/developer/docs/external-api/queries-pagination#top
 */
export declare const getEntitiesByPage: (params: {
    projectId: string;
    query: string;
    page: string;
    perPage: string;
    after?: string;
}) => any;
//# sourceMappingURL=entitiesByPage.d.ts.map