import type { NextApiRequest, ContentTypeMapping } from '../types';
type Entry = {
    id: string;
} & Record<string, unknown>;
interface StrapiWebhookResponse {
    event: (typeof ALLOWED_OPERATIONS)[number];
    model: string;
    entry: Entry;
}
declare const ALLOWED_OPERATIONS: string[];
export declare const revalidate: (request: NextApiRequest<StrapiWebhookResponse, unknown>, routeMappers: Record<string, ContentTypeMapping>) => Promise<string[]>;
export {};
//# sourceMappingURL=revalidate.d.ts.map