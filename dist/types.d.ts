import type { IncomingMessage, IncomingHttpHeaders } from 'node:http';
export interface NextApiRequest<T, K> extends IncomingMessage {
    headers: IncomingHttpHeaders & K;
    query: Partial<{
        TELEPORTHQ_ISR_TOKEN: string;
        [key: string]: string | string[];
    }>;
    body: T;
}
export type CMS_ITEM_VALUE = string | number | boolean;
export interface InputObject {
    [key: string]: {
        [key: string]: unknown;
    };
}
export type OutputObject = Record<string, CMS_ITEM_VALUE | Record<string, CMS_ITEM_VALUE>>;
export type WebHookHandler<T, K> = (request: NextApiRequest<T, K>, cb: (normalizedObject: OutputObject, contentType: string) => string) => Promise<void>;
//# sourceMappingURL=types.d.ts.map