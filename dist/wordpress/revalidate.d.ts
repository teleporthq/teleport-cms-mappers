import type { NextApiRequest, ContentTypeMapping } from '../types';
interface WordpressWebhookHeaders {
    'x-wp-webhook-name': string;
}
interface WordpressWebhookResponse {
    post_id: number;
    post: {
        ID: number;
        post_author: string;
        post_status: string;
        post_type: string;
    };
}
export declare const revalidate: (request: NextApiRequest<WordpressWebhookResponse, WordpressWebhookHeaders>, routeMappers: Record<string, ContentTypeMapping>) => string[];
export {};
//# sourceMappingURL=revalidate.d.ts.map