import { WebHookHandler } from "types"

const SUPPORTED_EVENTS = ['Update', 'Create', 'Delete']

interface FlotiqWebhookResponse {
  action: string
  ref: string
  webhookId: string
  contentTypeName: string
  // payload contains the id and all the updated information about the entity
  payload: Record<string, unknown>
}

export const revalidate: WebHookHandler<FlotiqWebhookResponse, unknown> = async (request, cb) => {
  const content = request.body

  const webhookAction = content.action

  if (!SUPPORTED_EVENTS.includes(webhookAction)) {
    console.log(
      `[ON-DEMAND_ISR]: Received an event that is not handled: ${webhookAction}}`
    )
    return
  }

  const contentTypeId = content.contentTypeName
  if (!contentTypeId) {
    throw new Error('Content type ID does not exist in the webhook response')
  }

  const documentId = content.payload.id as string

  const data = {
    id: documentId,
  }

  cb(data, contentTypeId)
}