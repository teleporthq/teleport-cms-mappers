import type { NextApiRequest } from 'next'
import { revalidatePath } from 'next/cache'
import { join } from 'node:path'
import process from 'node:process'

type OperationType = 'Entry' | 'DeleteEntry'

interface ContentfulWebhookResponse {
  sys: {
    /*
      Entity id
    */
    id: string
    type: OperationType
    contentType: {
      sys: {
        type: 'Link'
        linkType: 'ContentType'
        id: string
      }
    }
  }
  fields: {
    slug: {
      'en-US': string
    }
  }
}

interface ContentTypeMapping {
  contentType: string
  route: string
  type: 'details' | 'list'
  dynamicRouteAttribute?: string
}

const ALLOWED_OPERATIONS: string[] = ['DeletedEntry', 'Entry']

export const revalidate = async <T extends ContentfulWebhookResponse>(
  request: NextApiRequest,
  routeMappers: Record<string, ContentTypeMapping>
) => {
  const queryParams = request.query
  const content = request.body as T
  const operationType = content.sys?.type
  if (!ALLOWED_OPERATIONS.includes(operationType)) {
    return
  }

  if (process.env?.TELEPORTHQ_ISR_TOKEN !== queryParams?.['TELEPORTHQ_ISR_TOKEN']) {
    return
  }

  const contentType = content.sys?.contentType?.sys?.id

  /*
   Currently we auto-generate only one details page for a content type
  */
  const detailsPage = Object.values(routeMappers).filter(
    (value) => value.contentType === contentType && value.type === 'details'
  )?.[0]

  const pathsToRevalidate: string[] = []

  if (detailsPage) {
    const path = calcualtePath(content, detailsPage)
    pathsToRevalidate.push(path)
  }

  const listingPages = Object.values(routeMappers).filter(
    (value) => value.contentType === contentType && value.type === 'list'
  )

  listingPages.forEach((listingPage) => {
    const path = calcualtePath(content, listingPage)
    pathsToRevalidate.push(path)
  })

  pathsToRevalidate.forEach((path) => {
    console.log(`[ON-DEMAND_ISR]: Clearing cahce for path - ${path} `)
    revalidatePath(path)
  })
}

const calcualtePath = (content: ContentfulWebhookResponse, pageData: ContentTypeMapping) => {
  return pageData?.dynamicRouteAttribute
    ? join(
        pageData.route,
        pageData.dynamicRouteAttribute === 'id' ? content.sys.id : content.fields.slug['en-US']
      )
    : pageData.route
}
