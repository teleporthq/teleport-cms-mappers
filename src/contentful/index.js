export const normalize = (content) => {
  if (Array.isArray(content)) {
    return content.map((item) => normalize(item))
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
        return normalize(item)
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
    normalisedFields = normalize(content.fields)

    if (normalisedFields.file) {
      normalisedFile = {
        ...normalisedFile,
        ...normalize(normalisedFields.file),
      }
    }
  }

  if (content.sys) {
    normalisedSys = normalize(content.sys)
  }

  if (content.file) {
    normalisedFile = { ...normalisedFile, ...normalize(content.file) }
  }

  return {
    ...normalisedFields,
    ...normalisedSys,
    ...normalisedFile,
    ...content,
  }
}
