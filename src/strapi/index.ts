export const normalize = (content) => {
  if (Array.isArray(content)) {
    return content.map((item) => normalize(item))
  }

  if (typeof content !== 'object') {
    return content
  }

  if (content.id && content.attributes) {
    return normalizeObject(content)
  }

  return Object.keys(content).reduce((acc, key) => {
    if (Array.isArray(content[key])) {
      acc[key] = content[key].map((item) => {
        return normalize(item)
      })

      return acc
    }

    if (typeof content[key] === 'object') {
      acc[key] = { ...normalizeObject(content[key]) }

      return acc
    }

    acc[key] = content[key]
    return acc
  }, {})
}

const normalizeObject = (content) => {
  let normalizedAttributes = {}
  let normalizedRelations = {}

  if (content.attributes) {
    normalizedAttributes = normalize(content.attributes)
  }

  if (content.relations) {
    normalizedRelations = normalize(content.relations)
  }

  return {
    id: content.id,
    ...normalizedAttributes,
    ...normalizedRelations,
    ...content,
  }
}
