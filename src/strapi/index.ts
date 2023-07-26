function toPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const plainObj = {}

  for (const key in obj) {
    plainObj[key] = toPlainObject(obj[key])
  }

  return plainObj
}

const normalizeNestedAttributes = (attributes) => {
  const output = {}

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
      const normalizedValue = normalizeContent(value)
      output[key] = { id: value.data.id, ...normalizedValue }
    } else {
      output[key] = toPlainObject(value)
    }
  }

  return output
}

export const normalizeContent = (input) => {
  if (
    input === null ||
    input === undefined ||
    (typeof input === 'object' && !Object.keys(input).length)
  ) {
    return null
  }

  if (Array.isArray(input)) {
    return {
      data: input.map(normalize),
    }
  }

  let output = { ...input }

  if (input.attributes) {
    output = {
      ...output,
      ...normalizeNestedAttributes(input.attributes),
    }
    delete output.attributes
  }

  if (input.data) {
    output = normalizeContent(input.data)
  }

  return output
}

export const normalize = (
  content
): {
  meta: {
    pagination?: {
      total?: number
      limit?: number
      start?: number
      pages: number
      page: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
  data: Array<unknown> | unknown
} => {
  const total = content?.meta?.pagination?.total
  const limit = content?.meta?.pagination?.limit
  const start = content?.meta?.pagination?.start

  let pages = 0
  let page = 1
  if (total && limit) {
    pages = Math.ceil(total / limit)
  }

  if (start && limit) {
    page = start / limit + 1
  }

  const hasNextPage = page < pages
  const hasPrevPage = page >= 2
  return {
    meta: {
      ...content?.meta,
      pagination: {
        ...content?.meta?.pagination,
        ...(!!pages && { pages }),
        ...(!!page && { page }),
        hasNextPage,
        hasPrevPage,
      },
    },
    ...normalizeContent(content),
  }
}
