/**
 * gets and entity by attribute, which can be entity by Id or entity by name, depending on how the url and details page is generated
 */
export declare const getDataByAttribute: (params: {
    projectId: string;
    query: string;
    attribute: string;
}) => Promise<{
    meta: {
        pagination: {};
    };
    data: any[];
}>;
//# sourceMappingURL=entityByAttribute.d.ts.map