import type { WebHookHandler } from '../types'

interface WordpressWebhookHeaders {
  'x-wp-webhook-name': string
}

interface WordpressWebhookResponse {
  post_id: number
  post: {
    /* post_type refers to the slug that wordpress used to identify the content type.
      TODO: @JK-@Ionut Test it on more complex contentType names from the GUI.
      The GUI uses rest_base for loading data and entiries. Since wp-webhooks is a 3rd party
      plugin we don't have much control on what filed it used to change it use rest_base.
    */
    post_type: string
  } & Record<string, unknown>
}

const ALLOWED_OPERATIONS: string[] = ['post_update']

export const revalidate: WebHookHandler<WordpressWebhookResponse, WordpressWebhookHeaders> = async (
  request,
  cb
) => {
  const headers = request.headers
  console.log(`[ON-DEMAND_ISR]: Received a request ${headers['x-wp-webhook-name']}`)
  // if (process.env?.TELEPORTHQ_ISR_TOKEN !== request.query?.['TELEPORTHQ_ISR_TOKEN']) {
  //   return
  // }

  if (ALLOWED_OPERATIONS.includes(headers['x-wp-webhook-name']) === false) {
    console.log(
      `[ON-DEMAND_ISR]: Received an event that is not allowed: ${headers['x-wp-webhook-name']}`
    )
    return
  }

  const content = request.body
  const contentType = content.post.post_type
  const data = {
    id: content.post_id,
    ...transformObject(content.post),
  }

  cb(data, contentType)
}

const transformObject = (input: Record<string, unknown>) => {
  return Object.keys(input).reduce((acc: Record<string, unknown>, key) => {
    const newKey = key.replace(/^post_/, '')
    const value = input[key]

    if (typeof value === 'object') {
      acc[newKey] = transformObject(value as Record<string, unknown>)
      return acc
    }

    acc[newKey] = input[key]
    return acc
  }, {})
}
