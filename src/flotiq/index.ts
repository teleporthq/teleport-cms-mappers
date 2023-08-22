const FLOTIQ_API_URL = 'https://api.flotiq.com'

export const normalizeContent = (content) => {
  if (Array.isArray(content)) {
    return content.map((item) => normalizeContent(item))
  }

  if (typeof content !== 'object') {
    return content
  }

  const result = Object.keys(content).reduce((acc, key) => {
    const value = content[key]
    if (Array.isArray(value)) {
      if (value.length === 1) {
        acc[key] = value[0]
        if (content[key][0].url) {
          acc[key].url = `${FLOTIQ_API_URL}${content[key][0].url}`
        }
      } else {
        value.forEach((item) => {
          if (item.url) {
            item.url = `${FLOTIQ_API_URL}${item.url}`
          }
        })
        acc[key] = value
      }

      return acc
    }

    acc[key] = content[key]
    return acc
  }, {})

  return result
}

export const normalize = (
  content
): {
  meta: {
    pagination?: {
      total_count?: number
      total_pages?: number
      current_page?: number
      count: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
  data: Array<unknown> | unknown
} => {
  const totalItemCount = content?.total_count
  const totalPages = content?.total_pages
  const currentPage = content?.current_page
  const itemsPerPage = content?.count

  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage >= 2
  const data = normalizeContent(content.data)
  return {
    meta: {
      ...content?.meta,
      pagination: {
        ...content?.meta?.pagination,
        total_count: totalItemCount,
        total_pages: totalPages,
        current_page: currentPage,
        count: itemsPerPage,
        hasNextPage,
        hasPrevPage,
      },
    },
    data,
  }
}
