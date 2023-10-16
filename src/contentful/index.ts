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

// Max depth of 4 is a bit arbitrary, but it's a reasonable number that
// should be enough to catch most circular references without going too high on the exponential growth of circular references.
function pruneDeep(obj, currentDepth = 0, maxDepth = 4) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const clone = Array.isArray(obj) ? [] : {}

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (currentDepth < maxDepth) {
        clone[i] = pruneDeep(obj[i], currentDepth + 1, maxDepth)
      }
    }
    return clone
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (currentDepth < maxDepth) {
        clone[key] = pruneDeep(obj[key], currentDepth + 1, maxDepth)
      }
    }
  }

  return clone
}

function exceedsMaxDepth(obj, max = 4, currentDepth = 0) {
  if (currentDepth > max) {
    return true
  }

  if (obj === null || typeof obj !== 'object') {
    return false
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (exceedsMaxDepth(obj[i], max, currentDepth + 1)) {
        return true
      }
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (exceedsMaxDepth(obj[key], max, currentDepth + 1)) {
          return true
        }
      }
    }
  }

  return false
}

const normaliseObject = (content) => {
  let normalisedFields: Record<string, unknown> = {}
  let normalisedSys: Record<string, unknown> = {}
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

    // if contentType exists we need to know what type it is in order to use this in the switch component
    if (normalisedSys.contentType?.id) {
      normalisedSys = {
        ...normalisedSys,
        typeId: normalisedSys.contentType.id,
      }
    }
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
  const hasPrevPage = page >= 2

  let resolvedContentFul = resolveContentfulResponse(content)
  if (exceedsMaxDepth(resolvedContentFul)) {
    resolvedContentFul = pruneDeep(resolvedContentFul)
  }

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
    data: normalizeContent(resolvedContentFul),
  }
}
