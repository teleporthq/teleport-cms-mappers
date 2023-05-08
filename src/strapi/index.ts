export const normalize = (content) => {
  // Check if the content is a Strapi response
  if (content && content.data && Array.isArray(content.data)) {
    content = content.data;
  }

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
  let normalizedData = {}

  if (content.attributes) {
    normalizedData = normalize(content.attributes)
  }

  const result = {
    id: content.id,
    ...normalizedData,
    ...content,
  }

  // Remove undefined values from the result object
  Object.keys(result).forEach(key => {
    if (result[key] === undefined) {
      delete result[key];
    }
  });

  return result;
}
