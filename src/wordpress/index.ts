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
      pages: number
      page: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
  data: Array<unknown> | unknown
}> => {
  const headers = Object.fromEntries(content.headers.entries())
  const response = await content.json()

  let currentPage = parseInt(requestParams.page)
  if (!currentPage || isNaN(currentPage)) {
    currentPage = 1
  }

  let totalPages = parseInt(headers['x-wp-totalpages'])
  if (!totalPages || isNaN(totalPages)) {
    totalPages = 0
  }

  return {
    meta: {
      pagination: {
        ...(headers['x-wp-total'] && { total: parseInt(headers['x-wp-total']) }),
        pages: totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        page: currentPage,
      },
    },
    data: normalizeContent(response),
  }
}
