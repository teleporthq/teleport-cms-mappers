import type { NextApiRequest, ContentTypeMapping, WordpressWebhookResponse } from '../types';
interface WordpressWebhookHeaders {
    'x-wp-webhook-name': string;
}
export declare const revalidate: (request: NextApiRequest<WordpressWebhookResponse, WordpressWebhookHeaders>, routeMappers: Record<string, ContentTypeMapping>) => string[];
export {};
//# sourceMappingURL=revalidate.d.ts.map