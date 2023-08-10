import { WebHookHandler } from "types";
interface CaisyWebhookResponse {
    event_id: string;
    metadata: {
        blueprint_field_id?: string;
        blueprint_id: string;
        document_id: string;
        document_locale_id?: string;
    };
    scope: {
        projectId: string;
    };
    webhook: {
        trigger: string;
        webhook_id: string;
    };
}
export declare const revalidate: WebHookHandler<CaisyWebhookResponse, unknown>;
export {};
//# sourceMappingURL=revalidate.d.ts.map