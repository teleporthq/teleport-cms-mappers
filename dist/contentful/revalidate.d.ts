import type { WebHookHandler } from '../types';
interface ContentfulWebhookResponse {
    sys: {
        id: string;
        type: string;
        contentType: {
            sys: {
                type: 'Link';
                linkType: 'ContentType';
                id: string;
            };
        };
    };
    fields: {
        [key: string]: {
            'en-US': string;
        } | {
            [key: string]: string;
        };
    };
}
export declare const revalidate: WebHookHandler<ContentfulWebhookResponse, unknown>;
export {};
//# sourceMappingURL=revalidate.d.ts.map