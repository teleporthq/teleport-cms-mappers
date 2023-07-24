import { join } from 'node:path'
import process from 'node:process'
import type { NextApiRequest, ContentTypeMapping, ContentfulWebhookResponse } from '../types'
import { resolveDynamicAttributeToPathForContentful } from '../utils'

/*
  This is a common question open for all CMS integrations.
  Question:
    Sohould the save operations from the CMS needs to be handled ?
    - If yes, the content will always be in sync with the CMS and with the GUI.
      As GUI loads the data using REST calls, the data is always up to date.
      But the down side is, it triggers a lot of Save operations. Resulting in
      a lot of revalidation calls.
    - If no, the content will be in sync with the CMS/GUI. But get's updated on
      publish / delete / create etc..
*/

const ALLOWED_OPERATIONS: string[] = ['DeletedEntry', 'Entry']

export const revalidate = async (
  request: NextApiRequest<ContentfulWebhookResponse, unknown>,
  routeMappers: Record<string, ContentTypeMapping>
): Promise<string[]> => {
  const pathsToRevalidate: string[] = []
  if (process.env?.TELEPORTHQ_ISR_TOKEN !== request.query?.['TELEPORTHQ_ISR_TOKEN']) {
    return pathsToRevalidate
  }

  const content = request.body
  if (!ALLOWED_OPERATIONS.includes(content.sys?.type)) {
    console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${content.sys?.type}`)
    return pathsToRevalidate
  }

  const contentType = content.sys?.contentType?.sys?.id

  const paths = Object.values(routeMappers)
    .filter((item) => {
      if (item.contentType === contentType) {
        return item
      }
    })
    .map((item) => resolveDynamicAttribte(content, item))

  pathsToRevalidate.push(...paths)

  return pathsToRevalidate
}

const resolveDynamicAttribte = (
  content: ContentfulWebhookResponse,
  routeData: ContentTypeMapping
) => {
  if ('dynamicRouteAttribute' in routeData === false) {
    return routeData.route
  }

  if (routeData?.dynamicRouteAttribute === 'id') {
    return join(routeData.route, content.sys.id)
  }

  return resolveDynamicAttributeToPathForContentful(
    join(routeData.route, routeData.dynamicRouteAttribute),
    content
  )
}
