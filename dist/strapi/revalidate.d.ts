import type { WebHookHandler, OutputObject } from '../types';
interface StrapiWebhookResponse {
    event: (typeof ALLOWED_OPERATIONS)[number];
    model: string;
    uid: string;
    entry: OutputObject;
}
declare const ALLOWED_OPERATIONS: string[];
export declare const revalidate: WebHookHandler<StrapiWebhookResponse, unknown>;
export {};
//# sourceMappingURL=revalidate.d.ts.map