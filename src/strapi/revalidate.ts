import type { WebHookHandler, OutputObject } from '../types'

interface StrapiWebhookResponse {
  event: (typeof ALLOWED_OPERATIONS)[number]
  model: string
  uid: string
  entry: OutputObject
}

/*
  Strapi adda a `publishedAt` for each entry. So, we just need to handle the entry.update.
  As, the field get's updated for every entry.publush/entry.unpublish too.
*/

const ALLOWED_OPERATIONS: string[] = [
  'etnry.create',
  'entry.update',
  'entry.delete',
  'entry.publish',
  'entry.unpublish',
]

export const revalidate: WebHookHandler<StrapiWebhookResponse, unknown> = async (request, cb) => {
  const content = request.body

  if (ALLOWED_OPERATIONS.includes(content.event) === false) {
    console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${content.event}`)
    return
  }

  cb(content.entry, content.uid)
}
