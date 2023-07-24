import type { IncomingMessage, IncomingHttpHeaders } from 'node:http'

export interface NextApiRequest<T, K> extends IncomingMessage {
  headers: IncomingHttpHeaders & K
  query: Partial<{
    TELEPORTHQ_ISR_TOKEN: string
    [key: string]: string | string[]
  }>
  body: T
}

export interface ContentTypeMapping {
  contentType: string
  route: string
  type: 'details' | 'list'
  dynamicRouteAttribute?: string
}

export interface ContentfulWebhookResponse {
  sys: {
    /*
      Entity id
    */
    id: string
    type: string
    contentType: {
      sys: {
        type: 'Link'
        linkType: 'ContentType'
        id: string
      }
    }
  }
  fields: Record<
    string,
    {
      'en-US': string
    }
  >
}

export interface WordpressWebhookResponse {
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
