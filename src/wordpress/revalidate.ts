import type { WebHookHandler } from '../types'

interface WordpressWebhookHeaders {
  'x-wp-webhook-name': string
}

interface WordpressWebhookResponse {
  post_id: number
  post: {
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
