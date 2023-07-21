import type { NextApiRequest, ContentTypeMapping } from '../types';
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
    fields: Record<string, {
        'en-US': string;
    }>;
}
export declare const revalidate: (request: NextApiRequest<ContentfulWebhookResponse, unknown>, routeMappers: Record<string, ContentTypeMapping>) => Promise<string[]>;
export {};
//# sourceMappingURL=revalidate.d.ts.map