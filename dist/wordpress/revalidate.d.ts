import type { WebHookHandler } from '../types';
interface WordpressWebhookHeaders {
    'x-wp-webhook-name': string;
}
interface WordpressWebhookResponse {
    post_id: number;
    post: {
        post_type: string;
    } & Record<string, unknown>;
}
export declare const revalidate: WebHookHandler<WordpressWebhookResponse, WordpressWebhookHeaders>;
export {};
//# sourceMappingURL=revalidate.d.ts.map