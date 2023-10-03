const FLOTIQ_API_URL = 'https://api.flotiq.com'

export const normalizeContent = (content) => {
  if (Array.isArray(content)) {
    if (content.length === 0) {
      return {}
    }

    // assets always come in an array, even though is simple/multiple relation
    // for now we assume that when it's only an asset, it it a simple relation -> we normalize an object
    // when there are multiple we will return an array

    // also relation fields come as arrays all the time no matter the relation type
    // to avoid issues, we will treat those fields as arrays all the time
    if (content.length === 1 && (content[0].url || content[0].dataUrl)) {
      return mapAssetDetails(content[0])
    } else {
      return content.map((item) => normalizeContent(item))
    }
  }

  if (typeof content !== 'object') {
    return content
  }

  if (Object.keys(content.internal || {})?.length) {
    return {...normalizeContent(normalizeObject(content))}
  }

  if (content.url || content.dataUrl) {
    return mapAssetDetails(content)
  }

  const result = Object.keys(content).reduce((acc, key) => {
    const value = content[key]
    acc[key] = normalizeContent(value)

    return acc
  }, {})

  return result
}

const normalizeObject = (entityValue: Record<string, unknown>) => {
  let newData = entityValue

  if (newData?.internal) {
    newData = {
      ...newData,
      ...newData.internal,
    }

    delete newData.internal
  }

  return newData
}

const mapAssetDetails = (entityValue: Record<string, unknown>) => {
  if (!entityValue) {
    return {}
  }

  if (entityValue.dataUrl) {
    return {
      url: entityValue.dataUrl
    }
  }

  return {
    id: entityValue.id,
    url: `${FLOTIQ_API_URL}/${entityValue.url}`,
    size: {
      width: entityValue.width,
      height: entityValue.height,
    },
    assetType: entityValue.mimeType,
    name: entityValue.fileName,
  }
}
export const normalize = (
  content
): {
  meta: {
    pagination?: {
      total_count?: number
      pages?: number
      page?: number
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
        pages: totalPages,
        page: currentPage,
        count: itemsPerPage,
        hasNextPage,
        hasPrevPage,
      },
    },
    data,
  }
}
