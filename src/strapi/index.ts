type Pagination = {
  total?: number
  limit?: number
  start?: number
  pages?: number
  page?: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
}

type NormalizedContent = {
  meta: {
    pagination?: Pagination
  }
  data: unknown[] | unknown
}

const toPlainObject = (obj: any, strapiUrl?: string): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const plainObj: Record<string, unknown> = {}

  if (Array.isArray(obj)) {
    return obj.map((el) => normalizeNestedAttributes({ obj: { data: { ...el } } }).obj)
  }

  for (const key in obj) {
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      'data' in obj[key] &&
      obj[key].data !== null &&
      'id' in obj[key].data &&
      'attributes' in obj[key].data
    ) {
      const normalizedValue = normalizeContent(obj[key], strapiUrl)
      plainObj[key] = { id: obj[key].data.id, ...normalizedValue }
      continue
    }

    if (key === 'data') {
      return toPlainObject(obj[key], strapiUrl)
    }

    plainObj[key] = toPlainObject(obj[key], strapiUrl)
  }

  if (typeof plainObj['url'] === 'string' && plainObj['url'].startsWith('/')) {
    if (!strapiUrl) {
      strapiUrl = process.env.CMS_URL
    }
    plainObj['url'] = `${strapiUrl}${plainObj['url']}`
  }

  return plainObj
}

export const normalizeNestedAttributes = (
  attributes: Record<string, any>,
  strapiUrl?: string
): Record<string, unknown> => {
  const output: Record<string, unknown> = {}

  for (const key in attributes) {
    const value = attributes[key]

    if (
      typeof value === 'object' &&
      value !== null &&
      'data' in value &&
      value.data !== null &&
      'id' in value.data &&
      'attributes' in value.data
    ) {
      const normalizedValue = normalizeContent(value, strapiUrl)

      output[key] = { id: value.data.id, ...normalizedValue }
    } else if (Array.isArray(value)) {
      output[key] = value.map((el: any) => {
        return normalizeNestedAttributes(el, strapiUrl)
      })
    } else {
      output[key] = toPlainObject(value, strapiUrl)
    }
  }

  return output
}

export const normalizeContent = (input: any, strapiUrl?: string): any => {
  if (Array.isArray(input)) {
    return {
      data: input.map((value) => normalizeContent(value, strapiUrl)),
    }
  }

  if (
    input === null ||
    input === undefined ||
    (typeof input === 'object' && !Object.keys(input).length)
  ) {
    return null
  }

  let output = { ...input }

  if (input.attributes) {
    output = {
      ...output,
      ...normalizeNestedAttributes(input.attributes, strapiUrl),
    }
    delete output.attributes
  }

  if (input.data) {
    output = normalizeContent(input.data, strapiUrl)
  }

  if (output.url?.startsWith('/')) {
    if (!strapiUrl) {
      strapiUrl = process.env.CMS_URL
    }
    output.url = `${strapiUrl}${output.url}`
  }

  return output
}

export const normalize = (content: any, strapiUrl?: string): NormalizedContent => {
  const total = content?.meta?.pagination?.total
  const limit = content?.meta?.pagination?.limit
  const start = content?.meta?.pagination?.start

  let pages = 0
  let page = 1
  if (total && limit) {
    pages = Math.ceil(total / limit)
  }

  if (start && limit) {
    page = Math.floor(start / limit) + 1
  }

  const hasNextPage = page < pages
  const hasPrevPage = page >= 2

  let normalizedContent = normalizeContent(content.data, strapiUrl)
  // We need to make sure that we do not have nested data.data
  if (normalizedContent.data) {
    normalizedContent = normalizedContent.data
  }

  return {
    meta: {
      ...content?.meta,
      pagination: {
        ...content?.meta?.pagination,
        ...(pages && { pages }),
        ...(page && { page }),
        hasNextPage,
        hasPrevPage,
      },
    },
    data: normalizedContent,
  }
}
