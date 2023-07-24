/// <reference types="node" />
import type { IncomingMessage, IncomingHttpHeaders } from 'node:http';
export interface NextApiRequest<T, K> extends IncomingMessage {
    headers: IncomingHttpHeaders & K;
    query: Partial<{
        TELEPORTHQ_ISR_TOKEN: string;
        [key: string]: string | string[];
    }>;
    body: T;
}
export interface ContentTypeMapping {
    contentType: string;
    route: string;
    type: 'details' | 'list';
    dynamicRouteAttribute?: string;
}
export interface ContentfulWebhookResponse {
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
    fields: Record<string, {
        'en-US': string;
    }>;
}
export interface WordpressWebhookResponse {
    post_id: number;
    post: {
        ID: number;
        post_author: string;
        post_status: string;
        post_type: string;
    };
}
//# sourceMappingURL=types.d.ts.map