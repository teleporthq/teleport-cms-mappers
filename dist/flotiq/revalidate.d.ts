import { WebHookHandler } from "types";
interface FlotiqWebhookResponse {
    action: string;
    ref: string;
    webhookId: string;
    contentTypeName: string;
    payload: Record<string, unknown>;
}
export declare const revalidate: WebHookHandler<FlotiqWebhookResponse, unknown>;
export {};
//# sourceMappingURL=revalidate.d.ts.map