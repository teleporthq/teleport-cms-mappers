import { join } from 'node:path'
import type { NextApiRequest, ContentTypeMapping } from '../types'

interface WordpressWebhookHeaders {
  'x-wp-webhook-name': string
}

interface WordpressWebhookResponse {
  post_id: number
  post: {
    ID: number
    post_author: string
    post_status: string
    /* post_type refers to the slug that wordpress used to identify the content type.
      TODO: @JK-@Ionut Test it on more complex contentType names from the GUI.
      The GUI uses rest_base for loading data and entiries. Since wp-webhooks is a 3rd party
      plugin we don't have much control on what filed it used to change it use rest_base.
    */
    post_type: string
  }
}

const ALLOWED_OPERATIONS: string[] = ['post_update']

export const revalidate = (
  request: NextApiRequest<WordpressWebhookResponse, WordpressWebhookHeaders>,
  routeMappers: Record<string, ContentTypeMapping>
): string[] => {
  const headers = request.headers
  const pathsToRevalidate: string[] = []
  console.log(`[ON-DEMAND_ISR]: Received a request ${headers['x-wp-webhook-name']}`)
  if (process.env?.TELEPORTHQ_ISR_TOKEN !== request.query?.['TELEPORTHQ_ISR_TOKEN']) {
    return pathsToRevalidate
  }

  if (ALLOWED_OPERATIONS.includes(headers['x-wp-webhook-name']) === false) {
    console.log(
      `[ON-DEMAND_ISR]: Received an event that is not allowed: ${headers['x-wp-webhook-name']}`
    )
    return pathsToRevalidate
  }

  const content = request.body
  const paths = Object.values(routeMappers)
    .filter((item) => {
      if (item.contentType === content.post.post_type) {
        return item
      }
    })
    .map((item) => resolveDynamicAttribte(content.post, item))

  pathsToRevalidate.push(...paths)
  return pathsToRevalidate
}

const resolveDynamicAttribte = (
  content: WordpressWebhookResponse['post'],
  routeData: ContentTypeMapping
): string | undefined => {
  if ('dynamicRouteAttribute' in routeData === false) {
    return routeData.route?.startsWith('/') ? routeData.route : `/${routeData.route}`
  }

  if (routeData.dynamicRouteAttribute === 'id') {
    const route = join(routeData.route, String(content.ID))
    return route.startsWith('/') ? route : `/${route}`
  }
}
