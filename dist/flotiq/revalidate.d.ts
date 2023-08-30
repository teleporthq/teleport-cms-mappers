import { OutputObject, WebHookHandler } from "types";
interface FlotiqWebhookResponse {
    action: string;
    ref: string;
    webhookId: string;
    contentTypeName: string;
    payload: OutputObject;
}
export declare const revalidate: WebHookHandler<FlotiqWebhookResponse, unknown>;
export {};
//# sourceMappingURL=revalidate.d.ts.map