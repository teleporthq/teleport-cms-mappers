import type { NextApiRequest, ContentTypeMapping } from '../types'
import process from 'node:process'
import { join } from 'node:path'
import { resolveDynamicAttributeToPath } from '../utils'

type Entry = { id: string } & Record<string, unknown>

interface StrapiWebhookResponse {
  event: (typeof ALLOWED_OPERATIONS)[number]
  model: string
  entry: Entry
}

const regexPattern = /api::([^.\s]+)/

const ALLOWED_OPERATIONS: string[] = [
  'etnry.create',
  'entry.publish',
  'entry.unpublish',
  'entry.update',
  'entry.delete',
]

export const revalidate = async (
  request: NextApiRequest<StrapiWebhookResponse, unknown>,
  routeMappers: Record<string, ContentTypeMapping>
): Promise<string[]> => {
  const pathsToRevalidate: string[] = []
  console.log(`[ON-DEMAND_ISR]: Received a request`)
  if (process.env?.TELEPORTHQ_ISR_TOKEN !== request.query?.['TELEPORTHQ_ISR_TOKEN']) {
    return pathsToRevalidate
  }

  const content = request.body
  if (ALLOWED_OPERATIONS.includes(content.event) === false) {
    console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${content.event}`)
    return pathsToRevalidate
  }

  const paths = Object.values(routeMappers)
    .filter((item) => {
      const model = getModelFromContentType(item.contentType)
      if (model && item.contentType === model) {
        return item
      }
    })
    .map((item) => resolveDynamicAttribte(content.entry, item))

  pathsToRevalidate.push(...paths)
  return pathsToRevalidate.filter(Boolean)
}

const resolveDynamicAttribte = (
  entry: StrapiWebhookResponse['entry'],
  routeData: ContentTypeMapping
): string | undefined => {
  if ('dynamicRouteAttribute' in routeData === false) {
    return routeData.route?.startsWith('/') ? routeData.route : `/${routeData.route}`
  }

  const route = join(routeData.route, routeData.dynamicRouteAttribute)
  return resolveDynamicAttributeToPath(route, entry)
}

const getModelFromContentType = (contentType: string): string | null => {
  const match = contentType.match(regexPattern)
  return match ? match[1] : null
}
