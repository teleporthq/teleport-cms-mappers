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

const toPlainObject = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const plainObj: Record<string, unknown> = {}

  for (const key in obj) {
    plainObj[key] = toPlainObject(obj[key])
  }

  return plainObj
}

export const normalizeNestedAttributes = (
  attributes: Record<string, any>
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
      const normalizedValue = normalizeContent(value)
      output[key] = { id: value.data.id, ...normalizedValue }
    } else if (Array.isArray(value)) {
      output[key] = value.map((el: any) => {
        return normalizeNestedAttributes(el)
      })
    } else {
      output[key] = toPlainObject(value)
    }
  }

  return output
}

export const normalizeContent = (input: any): any => {
  if (
    input === null ||
    input === undefined ||
    (typeof input === 'object' && !Object.keys(input).length)
  ) {
    return null
  }

  if (Array.isArray(input)) {
    return {
      data: input.map(normalizeContent),
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

export const normalize = (content: any): NormalizedContent => {
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
    data: normalizeContent(content.data),
  }
}
