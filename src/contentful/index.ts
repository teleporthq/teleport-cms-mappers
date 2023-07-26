import resolveContentfulResponse from 'contentful-resolve-response'

const normalizeContent = (content) => {
  if (Array.isArray(content)) {
    return content.map((item) => normalizeContent(item))
  }

  if (typeof content !== 'object') {
    return content
  }

  if (Object.keys(content.fields || {})?.length && Object.keys(content.sys || {})?.length) {
    return normaliseObject(content)
  }

  return Object.keys(content).reduce((acc, key) => {
    if (Array.isArray(content[key])) {
      acc[key] = content[key].map((item) => {
        return normalizeContent(item)
      })

      return acc
    }

    if (typeof content[key] === 'object') {
      acc[key] = { ...normaliseObject(content[key]) }

      return acc
    }

    acc[key] = content[key]
    return acc
  }, {})
}

const normaliseObject = (content) => {
  let normalisedFields: Record<string, unknown> = {}
  let normalisedSys = {}
  let normalisedFile = {}

  if (content.fields) {
    normalisedFields = normalizeContent(content.fields)

    if (normalisedFields.file) {
      normalisedFile = {
        ...normalisedFile,
        ...normalizeContent(normalisedFields.file),
      }
    }
  }

  if (content.sys) {
    normalisedSys = normalizeContent(content.sys)
  }

  if (content.file) {
    normalisedFile = { ...normalisedFile, ...normalizeContent(content.file) }
  }

  return {
    ...normalisedFields,
    ...normalisedSys,
    ...normalisedFile,
    ...content,
  }
}

export const normalize = (
  content
): {
  meta: {
    pagination?: {
      total?: number
      limit?: number
      skip?: number
      pages: number
      page: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
  data: Array<unknown> | unknown
} => {
  let pages = 0
  let page = 1
  if (content.total && content.limit) {
    pages = Math.ceil(content.total / content.limit)
  }

  if (content.skip && content.limit) {
    page = content.skip / content.limit + 1
  }

  const hasNextPage = page < pages
  const hasPrevPage = page > 1

  return {
    meta: {
      pagination: {
        ...('limit' in content && { limit: content.limit }),
        ...('total' in content && { total: content.total }),
        ...('skip' in content && { skip: content.skip }),
        hasNextPage,
        hasPrevPage,
        page,
        pages,
      },
    },
    data: resolveContentfulResponse(normalizeContent(content)),
  }
}
