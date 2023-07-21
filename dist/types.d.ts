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
//# sourceMappingURL=types.d.ts.map