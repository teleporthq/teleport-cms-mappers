
const NESTING_LIMIT = 4

export const resolveResponseCustom = (response) => {
  // we combine together the Entry and Asset collections in an object
  const allEntities = Object.keys(response.includes || {}).reduce(
    (all: Record<string, any>, type) => {
      const entities = response.includes[type]
      entities.forEach((entity: any) => {
        all[entity.sys.id] = entity
      })

      return all
    },
    {}
  )

  // more like a safe-check inspired from the official library for all the items
  const responseItems = [...response.items].filter((entity) =>
    Boolean(entity.sys)
  )

  // some linked entities will exist only in the items array and won't exist in the includes response, but we need to find and resolve them too
  responseItems.forEach((item) => {
    allEntities[item.sys.id] = item
  })

  responseItems.map((item) => {
    const resolvedItem = resolveItem(item, allEntities, NESTING_LIMIT, 0)
    Object.assign(item, resolvedItem)
  })

  return responseItems
}

const resolveItem = (
  originalItem: Record<string, any>,
  allIncludes: Record<string, any>,
  nestingLimit: number,
  nesting: number
) => {
  const item = JSON.parse(JSON.stringify(originalItem))

  Object.keys(item.fields).forEach((key: string) => {
    const fieldValue = item.fields[key]

    // array of items
    if (Array.isArray(fieldValue)) {
      item.fields[key] = fieldValue.map((fieldValueItem) => {
        if (fieldValueItem.sys && fieldValueItem.sys.type === 'Link') {
          return resolvedLinkedEntries(fieldValueItem, allIncludes, nestingLimit, nesting + 1)
        }

        return fieldValueItem
      })
      return []
    }

    // rich text content field
    if (fieldValue.nodeType === 'document' && fieldValue.content.length > 0) {
      item.fields[key].content = fieldValue.content.map((fieldValueItem) => {
        // it has a link to an asset so we need to resolve it properly
        if (fieldValueItem.nodeType === 'embedded-asset-block') {
          const target = resolvedLinkedEntries(
            fieldValueItem.data.target,
            allIncludes,
            nestingLimit,
            nesting + 1,
          )

          const newData = {
            ...fieldValueItem,
            data: {
              ...fieldValueItem.data,
              target,
            },
          }

          return newData
        }

        return fieldValueItem
      })

      return
    }

    if (!fieldValue.sys) {
      item.fields[key] = fieldValue
      return
    }

    // link to an entry or asset
    if (fieldValue.sys.type === 'Link') {
      item.fields[key] = resolvedLinkedEntries(fieldValue, allIncludes, nestingLimit, nesting + 1)
      return
    }

    return fieldValue
  })

  return item
}

const resolvedLinkedEntries = (
  fieldValue: Record<string, any>,
  allIncludes: Record<string, any>,
  nestingLimit: number,
  nesting: number
) => {

  // if it has an asset link, we find the asset in the includes response and return it
  if (fieldValue.sys.linkType === 'Asset') {
    const resolvedItem = allIncludes[fieldValue.sys.id]
    return resolvedItem ?? fieldValue
  }

  if (fieldValue.sys.linkType === 'Entry') {
    // check nesting limit before resolving the response to avoid circular dependencies
    if (nesting >= nestingLimit) {
      return fieldValue
    }

    const resolvedItem = allIncludes[fieldValue.sys.id]

    if (resolvedItem) {
      return resolveItem(resolvedItem, allIncludes, nestingLimit, nesting)
    }
    // if item is not found, return the original object
    return fieldValue
  }

  return fieldValue
}

