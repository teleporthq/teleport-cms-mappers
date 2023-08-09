import { WebHookHandler } from "types"

const SUPPORTED_EVENTS = ['document_update']

interface CaisyWebhookResponse {
  event_id: string
  metadata: {
    blueprint_field_id?: string
    blueprint_id: string
    document_id: string
    document_locale_id?: string
  }
  scope: {
    projectId: string
  }
  webhook: {
    trigger: string
    webhook_id: string
  }
}

export const revalidate: WebHookHandler<CaisyWebhookResponse, unknown> = async (request, cb) => {
  const content = request.body

  const webhookAction = content.webhook.trigger

  if (!SUPPORTED_EVENTS.includes(webhookAction)) {
    console.log(
      `[ON-DEMAND_ISR]: Received an event that is not handled: ${webhookAction}}`
    )
    return
  }

  const contentTypeId = content.metadata.blueprint_id
  if (!contentTypeId) {
    throw new Error('Content type ID does not exist in the webhook response')
  }

  const documentId = content.metadata.document_id

  const data = {
    id: documentId,
  }

  cb(data, contentTypeId)
}