import { decode } from 'he'

export const normalizeContent = (input) => {
  if (Array.isArray(input) && !input.length) {
    return []
  }

  if (input === null || input === undefined) {
    return input
  }

  if (typeof input === 'object' && !Object.keys(input).length) {
    return {}
  }

  if (Array.isArray(input)) {
    return input.map(normalizeContent)
  }

  const output = { ...input } as Record<string, Record<string, unknown>>
  const existingTitle = output?.title?.rendered
  if (existingTitle) {
    try {
      const newTitle = decode(existingTitle as string)
      output.title.rendered = newTitle || output.title.rendered
    } catch (error) {
      /* empty */
    }
  }

  return output
}

export const normalize = async (
  content,
  requestParams
): Promise<{
  meta: {
    pagination?: {
      total?: number
      pages?: number
      hasNextPage?: boolean
      hasPrevPage?: boolean
    }
  }
  data: Array<unknown> | unknown
}> => {
  const headers = Object.fromEntries(content.headers.entries())
  const response = await content.json()

  const currentPage = parseInt(requestParams.page)
  return {
    meta: {
      pagination: {
        ...(headers['x-wp-total'] && { total: parseInt(headers['x-wp-total']) }),
        ...(headers['x-wp-totalpages'] && { pages: parseInt(headers['x-wp-totalpages']) }),
        hasNextPage: currentPage < parseInt(headers['x-wp-totalpages']),
        hasPrevPage: currentPage > 0,
      },
    },
    data: normalizeContent(response),
  }
}
