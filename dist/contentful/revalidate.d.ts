import type { NextApiRequest, ContentTypeMapping, ContentfulWebhookResponse } from '../types';
export declare const revalidate: (request: NextApiRequest<ContentfulWebhookResponse, unknown>, routeMappers: Record<string, ContentTypeMapping>) => Promise<string[]>;
//# sourceMappingURL=revalidate.d.ts.map