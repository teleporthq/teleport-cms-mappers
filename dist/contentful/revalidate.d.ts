import type { NextApiRequest } from 'next';
type OperationType = 'Entry' | 'DeleteEntry';
interface ContentfulWebhookResponse {
    sys: {
        id: string;
        type: OperationType;
        contentType: {
            sys: {
                type: 'Link';
                linkType: 'ContentType';
                id: string;
            };
        };
    };
    fields: {
        slug: {
            'en-US': string;
        };
    };
}
interface ContentTypeMapping {
    contentType: string;
    route: string;
    type: 'details' | 'list';
    dynamicRouteAttribute?: string;
}
export declare const revalidate: <T extends ContentfulWebhookResponse>(request: NextApiRequest, routeMappers: Record<string, ContentTypeMapping>) => Promise<void>;
export {};
//# sourceMappingURL=revalidate.d.ts.map