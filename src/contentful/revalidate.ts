import type { CMS_ITEM_VALUE, InputObject, OutputObject, WebHookHandler } from '../types'

interface ContentfulWebhookResponse {
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
  fields: {
    [key: string]: { 'en-US': string } | { [key: string]: string }
  }
}

export const revalidate: WebHookHandler<ContentfulWebhookResponse, unknown> = async (
  request,
  cb
) => {
  if (process.env?.TELEPORTHQ_ISR_TOKEN !== request.query?.['TELEPORTHQ_ISR_TOKEN']) {
    return
  }

  const content = request.body
  const contentType = content.sys?.contentType?.sys?.id

  switch (content.sys.type) {
    case 'DeletedEntry': {
      /*
        For deletion of a contentful entry, we have access to only the `id`
        If the URL's are using any other fields in them. We can't clear those paths.
      */
      cb({ id: content.sys.id }, contentType)
      break
    }
    case 'Entry': {
      const normalizedData: Record<string, CMS_ITEM_VALUE | Record<string, CMS_ITEM_VALUE>> = {
        id: content.sys.id,
        ...transformInput(content.fields),
      }

      cb(normalizedData, contentType)
      break
    }
    default: {
      throw new Error(
        `[ON-DEMAND_ISR]: Recevied a webhook operation that is not supported ${contentType}`
      )
    }
  }
}

const transformInput = (input: InputObject): OutputObject => {
  const output: OutputObject = {}

  Object.keys(input).forEach((field) => {
    const languageKey = Object.keys(input[field])[0]
    const fieldValue = input[field][languageKey]

    if (typeof fieldValue === 'object') {
      if ('sys' in fieldValue) {
        output[field] = (fieldValue as any)['sys']['id']
      } else if (!Array.isArray(fieldValue) && Object.keys(fieldValue).length > 0) {
        output[field] = { ...(fieldValue as Record<string, CMS_ITEM_VALUE>) }
      } else {
        output[field] = fieldValue as unknown as CMS_ITEM_VALUE
      }
    } else {
      output[field] = fieldValue as CMS_ITEM_VALUE
    }
  })

  return output
}
