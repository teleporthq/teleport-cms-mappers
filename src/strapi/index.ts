export const normalize = (content) => {
  if (content && content.data && Array.isArray(content.data)) {
    content = content.data;
  }

  if (Array.isArray(content)) {
    return content.map((item) => normalize(item))
  }

  if (typeof content !== 'object' || content === null) {
    return content
  }

  if (content.id && (content.attributes || content.data)) {
    return normalizeObject(content)
  }

  return Object.keys(content).reduce((acc, key) => {
    if (Array.isArray(content[key])) {
      acc[key] = content[key].map((item) => {
        return normalize(item)
      })

      return acc
    }

    if (typeof content[key] === 'object' && content[key] !== null) {
      acc[key] = { ...normalizeObject(content[key]) }

      return acc
    }

    acc[key] = content[key]
    return acc
  }, {})
}


const normalizeObject = (content) => {
  let normalizedAttributes = {}
  let normalizedData = {}

  if (content && content.attributes) {
    normalizedAttributes = normalize(content.attributes)
  }

  if (content && content.data) {
    normalizedData = normalize(content.data)
  }

  const result = content.id ? {
    id: content.id,
    ...normalizedAttributes,
    ...normalizedData,
    ...content,
  } : content;

  return result;
}